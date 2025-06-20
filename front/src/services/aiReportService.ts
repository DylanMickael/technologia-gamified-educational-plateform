import Groq from "groq-sdk"
import trackerData from "../data/tracker.json"
import formationsData from "../data/formations.json"

export interface ReportConfig {
    activiteId: string
    periode: "last_week" | "last_month" | "last_quarter" | "all_time"
    typeAnalyse: "performance" | "engagement" | "progression" | "complete"
    includeRecommendations: boolean
    includeGraphiques: boolean
    formatSortie: "summary" | "detailed" | "insights"
}

export interface AIReportResult {
    titre: string
    dateGeneration: string
    resumeExecutif: string
    metriques: Array<{
        nom: string
        valeur: string
        unite?: string
        evolution?: number
    }>
    insights: Array<{
        titre: string
        description: string
        impact: "Élevé" | "Moyen" | "Faible"
    }>
    recommandations: Array<{
        titre: string
        description: string
        priorite: "Haute" | "Moyenne" | "Basse"
        impactEstime: string
    }>
    analyseDetaillee: string
}

export async function generateAIReport(config: ReportConfig): Promise<AIReportResult> {
    // Filtrer les données selon la configuration
    const activityData = trackerData.activities.find((a) => a.id === config.activiteId)
    const participantsData = trackerData.participantsSessions.filter((p) => p.activiteId === config.activiteId)
    const alertesData = trackerData.alertes.filter((a) => a.activiteId === config.activiteId)
    const formationData = formationsData.formations.find((f) => f.id === activityData?.formation)

    if (!activityData || !formationData) {
        throw new Error("Données d'activité non trouvées")
    }

    // Calculer les métriques de base
    const metriques = calculateMetrics(participantsData, activityData)

    // Préparer le contexte pour l'IA
    const contextData = {
        activite: activityData,
        formation: formationData,
        participants: participantsData,
        alertes: alertesData,
        metriques: metriques,
        periode: config.periode,
        typeAnalyse: config.typeAnalyse,
    }

    // Générer le prompt pour l'IA
    const prompt = generatePrompt(contextData, config)

    try {
        
        const client = new Groq({
            apiKey: process.env.GROQ_API_KEY,
            dangerouslyAllowBrowser: true
        });

        
        const chatCompletion = await client.chat.completions.create({
            messages: [
              {
                role: "system",
                content: `Tu es un expert en analyse de données éducatives et en formation. 
                Tu analyses les données de participation aux formations technologiques et génères des rapports détaillés avec des insights actionnables.
                Réponds toujours en français et structure tes réponses de manière claire et professionnelle.
                Utilise des données concrètes et propose des recommandations spécifiques et réalisables.`
              },
              {
                role: "user",
                content: prompt
              }
            ],
            model: 'llama3-8b-8192',
        });

        const text = chatCompletion.choices[0].message.content ?? "Aucune réponse générée"
        // Parser la réponse de l'IA
        const reportResult = parseAIResponse(text, metriques, activityData.nom ? activityData.nom : "Activité inconnue")

        return reportResult
    } catch (error) {
        console.error("Erreur lors de la génération du rapport IA:", error)
        throw new Error("Impossible de générer le rapport IA")
    }
}

function calculateMetrics(participants: any[], activity: any) {
    const totalParticipants = participants.length
    const participantsActifs = participants.filter((p) => p.statut !== "abandonne").length
    const tempsTotal = participants.reduce((acc, p) => acc + p.temps.totalMinutes, 0)
    const tempsMoyen = totalParticipants > 0 ? Math.round(tempsTotal / totalParticipants) : 0
    const tauxReussiteMoyen =
        totalParticipants > 0
            ? Math.round(participants.reduce((acc, p) => acc + p.performance.tauxReussite, 0) / totalParticipants)
            : 0
    const progressionMoyenne =
        totalParticipants > 0
            ? Math.round(participants.reduce((acc, p) => acc + p.progression.pourcentage, 0) / totalParticipants)
            : 0

    const participantsEnRetard = participants.filter((p) => p.statut === "en_retard").length
    const participantsExcellents = participants.filter((p) => p.statut === "excellent").length
    const tauxAbandon =
        totalParticipants > 0
            ? Math.round((participants.filter((p) => p.statut === "abandonne").length / totalParticipants) * 100)
            : 0

    return {
        totalParticipants,
        participantsActifs,
        tempsTotal,
        tempsMoyen,
        tauxReussiteMoyen,
        progressionMoyenne,
        participantsEnRetard,
        participantsExcellents,
        tauxAbandon,
        objectifTemps: activity.objectifs.tempsMinimum,
        objectifReussite: activity.objectifs.tauxReussiteMinimum,
    }
}

function generatePrompt(contextData: any, config: ReportConfig): string {
    const { activite, formation, participants, alertes, metriques } = contextData

    return `
Analyse les données suivantes d'une formation et génère un rapport détaillé :

## CONTEXTE
- **Activité**: ${activite.nom}
- **Formation**: ${formation.titre}
- **Période d'analyse**: ${config.periode}
- **Type d'analyse**: ${config.typeAnalyse}

## DONNÉES PARTICIPANTS (${participants.length} participants)
${participants
            .map(
                (p: any) => `
- **${p.nom}** (${p.statut})
  - Temps total: ${p.temps.totalMinutes} minutes
  - Progression: ${p.progression.pourcentage}%
  - Taux de réussite: ${p.performance.tauxReussite}%
  - Dernière connexion: ${p.activite.derniereConnexion}
  - Difficultés: ${p.performance.difficultesIdentifiees.join(", ") || "Aucune"}
`,
            )
            .join("")}

## MÉTRIQUES CALCULÉES
- Participants total: ${metriques.totalParticipants}
- Participants actifs: ${metriques.participantsActifs}
- Temps moyen par participant: ${metriques.tempsMoyen} minutes
- Taux de réussite moyen: ${metriques.tauxReussiteMoyen}%
- Progression moyenne: ${metriques.progressionMoyenne}%
- Participants en retard: ${metriques.participantsEnRetard}
- Participants excellents: ${metriques.participantsExcellents}
- Taux d'abandon: ${metriques.tauxAbandon}%

## OBJECTIFS DE L'ACTIVITÉ
- Temps minimum requis: ${activite.objectifs.tempsMinimum} minutes
- Taux de réussite minimum: ${activite.objectifs.tauxReussiteMinimum}%
- Étapes obligatoires: ${activite.objectifs.etapesObligatoires}

## ALERTES ACTIVES
${alertes.map((a: any) => `- ${a.message} (${a.priorite})`).join("\n")}

## INSTRUCTIONS
Génère un rapport structuré avec :

1. **RÉSUMÉ EXÉCUTIF** (2-3 phrases sur l'état général)

2. **INSIGHTS CLÉS** (3-5 observations importantes avec leur impact)
Format: "INSIGHT: [titre] | DESCRIPTION: [description] | IMPACT: [Élevé/Moyen/Faible]"

3. **RECOMMANDATIONS** (3-5 actions concrètes si demandées)
Format: "RECOMMANDATION: [titre] | DESCRIPTION: [description] | PRIORITÉ: [Haute/Moyenne/Basse] | IMPACT: [description de l'impact]"

4. **ANALYSE DÉTAILLÉE** (analyse approfondie des tendances, problèmes et opportunités)

Concentre-toi sur les aspects les plus critiques et propose des solutions actionnables.
Utilise les données concrètes pour étayer tes conclusions.
`
}

function parseAIResponse(aiResponse: string, metriques: any, activityName: string): AIReportResult {
    const lines = aiResponse.split("\n")
    let currentSection = ""
    let resumeExecutif = ""
    let insights: any[] = []
    const recommandations: any[] = []
    let analyseDetaillee = ""

    for (const line of lines) {
        const trimmedLine = line.trim()

        if (trimmedLine.includes("RÉSUMÉ EXÉCUTIF") || trimmedLine.includes("RESUME EXECUTIF")) {
            currentSection = "resume"
            continue
        } else if (trimmedLine.includes("INSIGHTS") || trimmedLine.includes("INSIGHT")) {
            currentSection = "insights"
            continue
        } else if (trimmedLine.includes("RECOMMANDATIONS") || trimmedLine.includes("RECOMMANDATION")) {
            currentSection = "recommandations"
            continue
        } else if (trimmedLine.includes("ANALYSE DÉTAILLÉE") || trimmedLine.includes("ANALYSE DETAILLEE")) {
            currentSection = "analyse"
            continue
        }

        if (currentSection === "resume" && trimmedLine && !trimmedLine.startsWith("#")) {
            resumeExecutif += trimmedLine + " "
        } else if (currentSection === "insights" && trimmedLine.includes("INSIGHT:")) {
            const parts = trimmedLine.split("|")
            if (parts.length >= 3) {
                insights.push({
                    titre: parts[0].replace("INSIGHT:", "").trim(),
                    description: parts[1].replace("DESCRIPTION:", "").trim(),
                    impact: parts[2].replace("IMPACT:", "").trim() as "Élevé" | "Moyen" | "Faible",
                })
            }
        } else if (currentSection === "recommandations" && trimmedLine.includes("RECOMMANDATION:")) {
            const parts = trimmedLine.split("|")
            if (parts.length >= 4) {
                recommandations.push({
                    titre: parts[0].replace("RECOMMANDATION:", "").trim(),
                    description: parts[1].replace("DESCRIPTION:", "").trim(),
                    priorite: parts[2].replace("PRIORITÉ:", "").replace("PRIORITE:", "").trim() as "Haute" | "Moyenne" | "Basse",
                    impactEstime: parts[3].replace("IMPACT:", "").trim(),
                })
            }
        } else if (currentSection === "analyse" && trimmedLine && !trimmedLine.startsWith("#")) {
            analyseDetaillee += trimmedLine + "\n"
        }
    }

    // Si le parsing échoue, utiliser le texte brut
    if (!resumeExecutif) {
        resumeExecutif = aiResponse.substring(0, 200) + "..."
    }
    if (insights.length === 0) {
        insights = [
            {
                titre: "Analyse générée par IA",
                description: "Rapport complet disponible dans l'analyse détaillée",
                impact: "Moyen" as const,
            },
        ]
    }
    if (analyseDetaillee.length === 0) {
        analyseDetaillee = aiResponse
    }

    return {
        titre: `Rapport IA - ${activityName}`,
        dateGeneration: new Date().toISOString(),
        resumeExecutif: resumeExecutif.trim(),
        metriques: [
            { nom: "Participants Total", valeur: metriques.totalParticipants.toString() },
            { nom: "Temps Moyen", valeur: `${metriques.tempsMoyen}`, unite: "minutes" },
            { nom: "Taux de Réussite", valeur: `${metriques.tauxReussiteMoyen}`, unite: "%" },
            { nom: "Progression Moyenne", valeur: `${metriques.progressionMoyenne}`, unite: "%" },
            { nom: "Taux d'Abandon", valeur: `${metriques.tauxAbandon}`, unite: "%" },
        ],
        insights,
        recommandations,
        analyseDetaillee: analyseDetaillee.trim(),
    }
}

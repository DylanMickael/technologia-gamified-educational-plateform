import type React from "react"
import { useState } from "react"
import { Brain, FileText, Download, Loader2, BarChart3, TrendingUp, Target, Sparkles, Filter } from "lucide-react"
import { useScrollAnimation } from "../../../hooks/useScrollAnimation"
import { generateAIReport, type ReportConfig, type AIReportResult } from "../../../services/aiReportService"
import trackerData from "../../../data/tracker.json"

const AnimatedDiv: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children,
  delay = 0,
  className = "",
}) => {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <div
      ref={ref}
      className={`transition-all duration-800 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

const AIReportGenerator: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [reportResult, setReportResult] = useState<AIReportResult | null>(null)
  const [reportConfig, setReportConfig] = useState<ReportConfig>({
    activiteId: "",
    periode: "last_month",
    typeAnalyse: "complete",
    includeRecommendations: true,
    includeGraphiques: true,
    formatSortie: "detailed",
  })

  const activities = trackerData.activities

  const handleGenerateReport = async () => {
    if (!reportConfig.activiteId) {
      alert("Veuillez sélectionner une activité")
      return
    }

    setIsGenerating(true)
    try {
      const result = await generateAIReport(reportConfig)
      setReportResult(result)
    } catch (error) {
      console.error("Erreur lors de la génération du rapport:", error)
      alert("Erreur lors de la génération du rapport. Veuillez réessayer.")
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadReport = () => {
    if (!reportResult) return

    const reportContent = `
# Rapport d'Analyse IA - ${reportResult.titre}

## Résumé Exécutif
${reportResult.resumeExecutif}

## Métriques Clés
${reportResult.metriques.map((m: AIReportResult["metriques"][number]) => `- **${m.nom}**: ${m.valeur} ${m.unite || ""}`).join("\n")}

## Insights IA
${reportResult.insights.map((insight: AIReportResult["insights"][number]) => `### ${insight.titre}\n${insight.description}\n**Impact**: ${insight.impact}\n`).join("\n")}

## Recommandations
${reportResult.recommandations.map((rec: AIReportResult["recommandations"][number], idx: number) => `${idx + 1}. **${rec.titre}** (Priorité: ${rec.priorite})\n   ${rec.description}\n   Impact estimé: ${rec.impactEstime}\n`).join("\n")}

## Analyse Détaillée
${reportResult.analyseDetaillee}

---
Rapport généré le ${new Date().toLocaleDateString("fr-FR")} par l'IA TechFormation
    `

    const blob = new Blob([reportContent], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `rapport-ia-${reportResult.titre.toLowerCase().replace(/\s+/g, "-")}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getActivityName = (activityId: string) => {
    const activity = activities.find((a) => a.id === activityId)
    return activity?.nom || activityId
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-400 to-orange-400 text-white p-8 rounded-2xl">
        <div className="container mx-auto px-4">
          <AnimatedDiv>
            <div className="flex items-center mb-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">Assistant IA d'activités</h1>
                <p className="text-indigo-100">L'IA vous assiste dans le suivi activités que vous faites.</p>
              </div>
            </div>
          </AnimatedDiv>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Configuration du rapport */}
          <div className="lg:col-span-1">
            <AnimatedDiv className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-black mb-6 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Configuration du suivi
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Activité à analyser</label>
                  <select
                    value={reportConfig.activiteId}
                    onChange={(e) => setReportConfig({ ...reportConfig, activiteId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Sélectionner une activité</option>
                    {activities.map((activity: { id: string; nom: string }) => (
                      <option key={activity.id} value={activity.id}>
                        {activity.nom}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">Période d'analyse</label>
                  <select
                    value={reportConfig.periode}
                    onChange={(e) => setReportConfig({ ...reportConfig, periode: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="last_week">Dernière semaine</option>
                    <option value="last_month">Dernier mois</option>
                    <option value="last_quarter">Dernier trimestre</option>
                    <option value="all_time">Depuis le début</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">Type d'analyse</label>
                  <select
                    value={reportConfig.typeAnalyse}
                    onChange={(e) => setReportConfig({ ...reportConfig, typeAnalyse: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="performance">Performance des participants</option>
                    <option value="engagement">Analyse d'engagement</option>
                    <option value="progression">Suivi de progression</option>
                    <option value="complete">Analyse complète</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">Format de sortie</label>
                  <select
                    value={reportConfig.formatSortie}
                    onChange={(e) => setReportConfig({ ...reportConfig, formatSortie: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="summary">Résumé exécutif</option>
                    <option value="detailed">Rapport détaillé</option>
                    <option value="insights">Insights uniquement</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={reportConfig.includeRecommendations}
                      onChange={(e) => setReportConfig({ ...reportConfig, includeRecommendations: e.target.checked })}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Inclure les recommandations</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={reportConfig.includeGraphiques}
                      onChange={(e) => setReportConfig({ ...reportConfig, includeGraphiques: e.target.checked })}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Inclure les graphiques</span>
                  </label>
                </div>

                <button
                  onClick={handleGenerateReport}
                  disabled={isGenerating || !reportConfig.activiteId}
                  className="w-full bg-gradient-to-r from-pink-400 to-orange-400 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Génération en cours...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Générer le Suivi IA
                    </>
                  )}
                </button>
              </div>
            </AnimatedDiv>

            {/* Exemples de rapports */}
            <AnimatedDiv delay={100} className="bg-white rounded-xl p-6 shadow-lg mt-6">
              <h3 className="text-lg font-bold text-black mb-4">Exemples de Suivis</h3>
              <div className="space-y-3">
                {[
                  {
                    titre: "Analyse Performance Q1",
                    description: "Rapport complet sur les performances",
                    date: "2024-01-15",
                  },
                  {
                    titre: "Insights Engagement",
                    description: "Analyse de l'engagement des apprenants",
                    date: "2024-01-10",
                  },
                  {
                    titre: "Suivi Progression Robotique",
                    description: "Évolution des participants en robotique",
                    date: "2024-01-05",
                  },
                ].map((exemple, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium text-black text-sm">{exemple.titre}</div>
                    <div className="text-xs text-gray-600">{exemple.description}</div>
                    <div className="text-xs text-gray-500 mt-1">{exemple.date}</div>
                  </div>
                ))}
              </div>
            </AnimatedDiv>
          </div>

          {/* Résultats du rapport */}
          <div className="lg:col-span-2">
            {!reportResult && !isGenerating && (
              <AnimatedDiv delay={200} className="bg-white rounded-xl p-8 shadow-lg text-center">
                <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-600 mb-2">Prêt à générer votre rapport IA</h3>
                <p className="text-gray-500">
                  Configurez les paramètres à gauche et cliquez sur "Générer le Rapport IA" pour commencer l'analyse
                </p>
              </AnimatedDiv>
            )}

            {isGenerating && (
              <AnimatedDiv className="bg-white rounded-xl p-8 shadow-lg text-center">
                <Loader2 className="w-16 h-16 text-indigo-600 mx-auto mb-4 animate-spin" />
                <h3 className="text-xl font-medium text-black mb-2">Analyse en cours...</h3>
                <p className="text-gray-600 mb-4">L'IA analyse vos données et génère des insights personnalisés</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full animate-pulse" style={{ width: "60%" }}></div>
                </div>
              </AnimatedDiv>
            )}

            {reportResult && (
              <div className="space-y-6">
                {/* Header du rapport */}
                <AnimatedDiv className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-black">{reportResult.titre}</h2>
                      <p className="text-gray-600">
                        Activité: {getActivityName(reportConfig.activiteId)} • Généré le{" "}
                        {new Date(reportResult.dateGeneration).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                    <button
                      onClick={downloadReport}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Télécharger
                    </button>
                  </div>
                  <div className="bg-indigo-50 rounded-lg p-4">
                    <h3 className="font-medium text-black mb-2">Résumé Exécutif</h3>
                    <p className="text-gray-700">{reportResult.resumeExecutif}</p>
                  </div>
                </AnimatedDiv>

                {/* Métriques clés */}
                <AnimatedDiv delay={100} className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-black mb-4 flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Métriques Clés
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {reportResult.metriques.map((metrique: AIReportResult["metriques"][number], index: number) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-black">{metrique.valeur}</div>
                        <div className="text-sm text-gray-600">{metrique.nom}</div>
                        {metrique.evolution && (
                          <div
                            className={`text-xs mt-1 flex items-center ${
                              metrique.evolution > 0 ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            <TrendingUp className="w-3 h-3 mr-1" />
                            {metrique.evolution > 0 ? "+" : ""}
                            {metrique.evolution}%
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </AnimatedDiv>

                {/* Insights IA */}
                <AnimatedDiv delay={200} className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-black mb-4 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Insights IA
                  </h3>
                  <div className="space-y-4">
                    {reportResult.insights.map((insight: AIReportResult["insights"][number], index: number) => (
                      <div key={index} className="border-l-4 border-indigo-500 pl-4">
                        <h4 className="font-medium text-black">{insight.titre}</h4>
                        <p className="text-gray-700 text-sm mt-1">{insight.description}</p>
                        <div className="flex items-center mt-2">
                          <span className="text-xs text-gray-500">Impact:</span>
                          <span
                            className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                              insight.impact === "Élevé"
                                ? "bg-red-100 text-red-800"
                                : insight.impact === "Moyen"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                            }`}
                          >
                            {insight.impact}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </AnimatedDiv>

                {/* Recommandations */}
                {reportResult.recommandations.length > 0 && (
                  <AnimatedDiv delay={300} className="bg-white rounded-xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold text-black mb-4 flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Recommandations
                    </h3>
                    <div className="space-y-4">
                      {reportResult.recommandations.map((rec: AIReportResult["recommandations"][number], index: number) => (
                        <div key={index} className="bg-green-50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-black">{rec.titre}</h4>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                rec.priorite === "Haute"
                                  ? "bg-red-100 text-red-800"
                                  : rec.priorite === "Moyenne"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {rec.priorite}
                            </span>
                          </div>
                          <p className="text-gray-700 text-sm mb-2">{rec.description}</p>
                          <div className="text-xs text-gray-600">
                            <strong>Impact estimé:</strong> {rec.impactEstime}
                          </div>
                        </div>
                      ))}
                    </div>
                  </AnimatedDiv>
                )}

                {/* Analyse détaillée */}
                <AnimatedDiv delay={400} className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-black mb-4 flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Analyse Détaillée
                  </h3>
                  <div className="prose prose-gray max-w-none">
                    <div className="whitespace-pre-wrap text-gray-700">{reportResult.analyseDetaillee}</div>
                  </div>
                </AnimatedDiv>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIReportGenerator

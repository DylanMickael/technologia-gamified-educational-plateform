"use client"

import {
  Plus,
  Search,
  Clock,
  TrendingUp,
  AlertTriangle,
  Users,
  Play,
  Pause,
  Calendar,
  Target,
  Award,
  Activity,
  Timer,
  User,
  Mail,
  Zap,
} from "lucide-react"
import { TwAnimatedDiv } from "../../../components/AnimationComponents"
import { useTracker } from "../../../hooks/useTracker"

const ParticipantTracker = () => {
  const {
    activities,
    recherche,
    setRecherche,
    activiteSelectionnee,
    setActiviteSelectionnee,
    participantsFiltres,
    showNouvelleActivite,
    setShowNouvelleActivite,
    activiteActuelle,
    creerActivite,
    nouvelleActivite,
    setNouvelleActivite,
    formations,
    formatTemps,
    getFormationNom,
    getStatutCouleur,
  } = useTracker();
  
  const getStatutIcon = (statut: string) => {
    switch (statut) {
      case "excellent":
        return <Award className="w-4 h-4" />
      case "en_cours":
        return <Play className="w-4 h-4" />
      case "en_retard":
        return <AlertTriangle className="w-4 h-4" />
      case "abandonne":
        return <Pause className="w-4 h-4" />
      case "nouveau":
        return <Zap className="w-4 h-4" />
      default:
        return <User className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-400 to-pink-400 text-white p-8 rounded-2xl">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <TwAnimatedDiv>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Surveillance</h1>
              <p className="text-blue-100">Suivez individuellement les progrès de vos apprenants</p>
            </TwAnimatedDiv>
            <TwAnimatedDiv delay={100} className="hidden md:block">
              <div className=" to-pink-200 bg-opacity-20 rounded-lg p-4">
                <div className="text-2xl font-bold">{activities.length}</div>
                <div className="text-sm opacity-90">Activités créées</div>
              </div>
            </TwAnimatedDiv>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Sélection d'activité et création */}
        <div className="flex flex-wrap gap-4 items-center justify-between mb-8">
          <TwAnimatedDiv className="flex-1 min-w-64">
            <select
              value={activiteSelectionnee}
              onChange={(e) => setActiviteSelectionnee(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="">Sélectionner une activité</option>
              {activities.map((activite) => (
                <option key={activite.id} value={activite.id}>
                  {activite.nom}
                </option>
              ))}
            </select>
          </TwAnimatedDiv>
          <TwAnimatedDiv delay={100}>
            <button
              onClick={() => setShowNouvelleActivite(true)}
              className="bg-gradient-to-r from-orange-400 to-pink-400 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Nouvelle Activité
            </button>
          </TwAnimatedDiv>
        </div>

        {activiteActuelle && (
          <>
            {/* Informations de l'activité */}
            <TwAnimatedDiv delay={200} className="bg-white rounded-xl p-6 shadow-lg mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-black mb-2">{activiteActuelle.nom}</h2>
                  <p className="text-gray-600">{activiteActuelle.description}</p>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    Créée le {new Date(activiteActuelle.dateCreation).toLocaleDateString("fr-FR")}
                    <span className="mx-2">•</span>
                    <span className="font-medium">{getFormationNom(activiteActuelle.formation)}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      activiteActuelle.statut === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {activiteActuelle.statut === "active" ? "Active" : "En pause"}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <Timer className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-sm text-gray-600">Temps minimum</span>
                  </div>
                  <div className="text-xl font-bold text-black">
                    {formatTemps(activiteActuelle.objectifs.tempsMinimum)}
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <Target className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-sm text-gray-600">Taux de réussite</span>
                  </div>
                  <div className="text-xl font-bold text-black">{activiteActuelle.objectifs.tauxReussiteMinimum}%</div>
                </div>
              </div>
            </TwAnimatedDiv>

            {/* Barre de recherche */}
            <TwAnimatedDiv delay={400} className="mb-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher un participant..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={recherche}
                  onChange={(e) => setRecherche(e.target.value)}
                />
              </div>
            </TwAnimatedDiv>

            {/* Liste des participants */}
            <div className="space-y-4">
              {participantsFiltres.map((participant, index) => (
                <TwAnimatedDiv key={participant.id} delay={500 + index * 50}>
                  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <img
                          src={participant.avatar || "/placeholder.svg"}
                          alt={participant.nom}
                          className="w-12 h-12 rounded-full object-cover mr-4"
                        />
                        <div>
                          <h3 className="text-lg font-bold text-black">{participant.nom}</h3>
                          <p className="text-gray-600 text-sm flex items-center">
                            <Mail className="w-4 h-4 mr-1" />
                            {participant.email}
                          </p>
                          <div className="flex items-center mt-1">
                            {getStatutIcon(participant.statut)}
                            <span
                              className={`ml-1 px-2 py-1 rounded-full text-xs font-medium ${getStatutCouleur(participant.statut)}`}
                            >
                              {participant.statut.replace("_", " ")}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">
                          Dernière connexion:{" "}
                          {new Date(participant.activite.derniereConnexion).toLocaleDateString("fr-FR")}
                        </div>
                        <div className="text-sm text-gray-500">Streak: {participant.activite.streakActuel} jours</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Temps passé */}
                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Clock className="w-5 h-5 text-blue-600" />
                          <span className="text-xs text-gray-500">TEMPS</span>
                        </div>
                        <div className="text-2xl font-bold text-black mb-1">
                          {formatTemps(participant.temps.totalMinutes)}
                        </div>
                        <div className="text-sm text-gray-600">
                          {formatTemps(participant.temps.derniereSemaine)} cette semaine
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Moy: {formatTemps(participant.temps.moyenneParSession)} / session
                        </div>
                        <div
                          className={`mt-2 text-xs font-medium ${
                            participant.temps.totalMinutes >= activiteActuelle.objectifs.tempsMinimum
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {participant.temps.totalMinutes >= activiteActuelle.objectifs.tempsMinimum
                            ? "✓ Objectif atteint"
                            : `${formatTemps(activiteActuelle.objectifs.tempsMinimum - participant.temps.totalMinutes)} restant`}
                        </div>
                      </div>

                      {/* Performance */}
                      <div className="bg-green-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <TrendingUp className="w-5 h-5 text-green-600" />
                          <span className="text-xs text-gray-500">RÉUSSITE</span>
                        </div>
                        <div className="text-2xl font-bold text-black mb-1">
                          {participant.performance.tauxReussite}%
                        </div>
                        <div className="text-sm text-gray-600">
                          {participant.performance.exercicesReussis} / {participant.performance.exercicesTotal}{" "}
                          exercices
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Note moyenne: {participant.performance.notesMoyennes}/20
                        </div>
                        <div
                          className={`mt-2 text-xs font-medium ${
                            participant.performance.tauxReussite >= activiteActuelle.objectifs.tauxReussiteMinimum
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {participant.performance.tauxReussite >= activiteActuelle.objectifs.tauxReussiteMinimum
                            ? "✓ Objectif atteint"
                            : `${activiteActuelle.objectifs.tauxReussiteMinimum - participant.performance.tauxReussite}% manquant`}
                        </div>
                      </div>

                      {/* Activité */}
                      <div className="bg-orange-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Activity className="w-5 h-5 text-orange-600" />
                          <span className="text-xs text-gray-500">ACTIVITÉ</span>
                        </div>
                        <div className="text-2xl font-bold text-black mb-1">{participant.activite.joursActifs}</div>
                        <div className="text-sm text-gray-600">jours actifs</div>
                        <div className="text-xs text-gray-500 mt-1">
                          Fréquence: {participant.activite.frequenceConnexion}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {participant.temps.sessionsTotal} sessions total
                        </div>
                      </div>
                    </div>
                  </div>
                </TwAnimatedDiv>
              ))}
            </div>

            {participantsFiltres.length === 0 && (
              <TwAnimatedDiv delay={500} className="text-center py-12">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-600 mb-2">Aucun participant trouvé</h3>
                <p className="text-gray-500">
                  {recherche
                    ? "Aucun participant ne correspond à votre recherche"
                    : "Cette activité n'a pas encore de participants"}
                </p>
              </TwAnimatedDiv>
            )}
          </>
        )}

        {!activiteActuelle && activities.length === 0 && (
          <TwAnimatedDiv className="text-center py-12">
            <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">Aucune activité créée</h3>
            <p className="text-gray-500 mb-6">Créez votre première activité pour commencer le suivi des participants</p>
            <button
              onClick={() => setShowNouvelleActivite(true)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
            >
              Créer une activité
            </button>
          </TwAnimatedDiv>
        )}

        {/* Modal nouvelle activité */}
        {showNouvelleActivite && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-black">Créer une Nouvelle Activité</h3>
                  <button onClick={() => setShowNouvelleActivite(false)} className="text-gray-500 hover:text-gray-700">
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Nom de l'activité</label>
                    <input
                      type="text"
                      value={nouvelleActivite.nom}
                      onChange={(e) => setNouvelleActivite({ ...nouvelleActivite, nom: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ex: Suivi Robotique - Janvier 2024"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Formation à surveiller</label>
                    <select
                      value={nouvelleActivite.formation}
                      onChange={(e) => setNouvelleActivite({ ...nouvelleActivite, formation: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Sélectionner une formation</option>
                      {formations.map((formation) => (
                        <option key={formation.id} value={formation.id}>
                          {formation.titre}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Description</label>
                    <textarea
                      value={nouvelleActivite.description}
                      onChange={(e) => setNouvelleActivite({ ...nouvelleActivite, description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                      placeholder="Décrivez l'objectif de cette activité de suivi..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">Temps minimum (minutes)</label>
                      <input
                        type="number"
                        value={nouvelleActivite.tempsMinimum}
                        onChange={(e) =>
                          setNouvelleActivite({ ...nouvelleActivite, tempsMinimum: Number.parseInt(e.target.value) })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">Taux de réussite minimum (%)</label>
                      <input
                        type="number"
                        value={nouvelleActivite.tauxReussiteMinimum}
                        onChange={(e) =>
                          setNouvelleActivite({
                            ...nouvelleActivite,
                            tauxReussiteMinimum: Number.parseInt(e.target.value),
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">Étapes obligatoires</label>
                      <input
                        type="number"
                        value={nouvelleActivite.etapesObligatoires}
                        onChange={(e) =>
                          setNouvelleActivite({
                            ...nouvelleActivite,
                            etapesObligatoires: Number.parseInt(e.target.value),
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    onClick={() => setShowNouvelleActivite(false)}
                    className="px-6 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={creerActivite}
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                  >
                    Créer l'Activité
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ParticipantTracker

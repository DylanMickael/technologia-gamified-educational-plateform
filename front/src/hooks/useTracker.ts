import { useState, useEffect } from "react";
import trackerData from "../data/tracker.json"
import formationsData from "../data/formations.json"

export interface TrackerActivity {
  id: string;
  nom: string;
  formation: string;
  dateCreation: string;
  statut: string;
  description: string;
  objectifs: {
    tempsMinimum: number;
    tauxReussiteMinimum: number;
    etapesObligatoires: number;
  };
}

export interface ParticipantSession {
  id: string;
  participantId: string;
  activiteId: string;
  nom: string;
  email: string;
  avatar: string;
  dateInscription: string;
  statut: string;
  progression: {
    etapeActuelle: number;
    etapesCompletees: number;
    etapesTotales: number;
    pourcentage: number;
  };
  temps: {
    totalMinutes: number;
    derniereSemaine: number;
    moyenneParSession: number;
    sessionsTotal: number;
    tempsParEtape: number[];
  };
  performance: {
    tauxReussite: number;
    exercicesReussis: number;
    exercicesTotal: number;
    notesMoyennes: number;
    difficultesIdentifiees: string[];
  };
  activite: {
    derniereConnexion: string;
    frequenceConnexion: string;
    joursActifs: number;
    streakActuel: number;
  };
}


export interface TrackerActivity {
  id: string
  nom: string
  formation: string
  dateCreation: string
  statut: string
  description: string
  objectifs: {
    tempsMinimum: number
    tauxReussiteMinimum: number
    etapesObligatoires: number
  }
}

export interface ParticipantSession {
  id: string
  participantId: string
  activiteId: string
  nom: string
  email: string
  avatar: string
  dateInscription: string
  statut: string
  progression: {
    etapeActuelle: number
    etapesCompletees: number
    etapesTotales: number
    pourcentage: number
  }
  temps: {
    totalMinutes: number
    derniereSemaine: number
    moyenneParSession: number
    sessionsTotal: number
    tempsParEtape: number[]
  }
  performance: {
    tauxReussite: number
    exercicesReussis: number
    exercicesTotal: number
    notesMoyennes: number
    difficultesIdentifiees: string[]
  }
  activite: {
    derniereConnexion: string
    frequenceConnexion: string
    joursActifs: number
    streakActuel: number
  }
}

export function useTracker() {
    const [activities, setActivities] = useState<TrackerActivity[]>([])
    const [participants, setParticipants] = useState<ParticipantSession[]>([])
    const [activiteSelectionnee, setActiviteSelectionnee] = useState<string>("")
    const [showNouvelleActivite, setShowNouvelleActivite] = useState(false)
    const [nouvelleActivite, setNouvelleActivite] = useState({
      nom: "",
      formation: "",
      description: "",
      tempsMinimum: 120,
      tauxReussiteMinimum: 70,
      etapesObligatoires: 4,
    })
    const [recherche, setRecherche] = useState("")
  
    useEffect(() => {
      setActivities(trackerData.activities)
      setParticipants(trackerData.participantsSessions)
      if (trackerData.activities.length > 0) {
        setActiviteSelectionnee(trackerData.activities[0].id)
      }
    }, [])
  
    const formations = formationsData.formations
  
    const activiteActuelle = activities.find((a) => a.id === activiteSelectionnee)
    const participantsActivite = participants.filter((p) => p.activiteId === activiteSelectionnee)
    const participantsFiltres = participantsActivite.filter(
      (p) =>
        p.nom.toLowerCase().includes(recherche.toLowerCase()) || p.email.toLowerCase().includes(recherche.toLowerCase()),
    )
  
    const creerActivite = () => {
      const nouvelId = `activity-${activities.length + 1}`
      const activite: TrackerActivity = {
        id: nouvelId,
        nom: nouvelleActivite.nom,
        formation: nouvelleActivite.formation,
        dateCreation: new Date().toISOString().split("T")[0],
        statut: "active",
        description: nouvelleActivite.description,
        objectifs: {
          tempsMinimum: nouvelleActivite.tempsMinimum,
          tauxReussiteMinimum: nouvelleActivite.tauxReussiteMinimum,
          etapesObligatoires: nouvelleActivite.etapesObligatoires,
        },
      }
  
      setActivities([...activities, activite])
      setActiviteSelectionnee(nouvelId)
      setNouvelleActivite({
        nom: "",
        formation: "",
        description: "",
        tempsMinimum: 120,
        tauxReussiteMinimum: 70,
        etapesObligatoires: 4,
      })
      setShowNouvelleActivite(false)
    }
  
    const getStatutCouleur = (statut: string) => {
      switch (statut) {
        case "excellent":
          return "bg-green-100 text-green-800"
        case "en_cours":
          return "bg-blue-100 text-blue-800"
        case "en_retard":
          return "bg-orange-100 text-orange-800"
        case "abandonne":
          return "bg-red-100 text-red-800"
        case "nouveau":
          return "bg-purple-100 text-purple-800"
        default:
          return "bg-gray-100 text-gray-800"
      }
    }
  
    const formatTemps = (minutes: number) => {
      const heures = Math.floor(minutes / 60)
      const mins = minutes % 60
      return heures > 0 ? `${heures}h ${mins}m` : `${mins}m`
    }
  
    const getFormationNom = (formationId: string) => {
      const formation = formations.find((f) => f.id === formationId)
      return formation?.titre || formationId
    }

  return {
    activities,
    recherche,
    setRecherche,
    participants,
    activiteSelectionnee,
    setActiviteSelectionnee,
    participantsFiltres,
    showNouvelleActivite,
    nouvelleActivite,
    setNouvelleActivite,
    setShowNouvelleActivite,
    activiteActuelle,
    participantsActivite,
    creerActivite,
    formations,
    formatTemps,
    getFormationNom,
    getStatutCouleur,
  };
}

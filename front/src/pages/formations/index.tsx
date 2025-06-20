"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Search, Users, Clock, Star, ChevronRight } from "lucide-react"
import { useScrollAnimation } from "../../hooks/useScrollAnimation"
import formationsData from "../../data/formations.json"
import { Link } from "react-router-dom"

interface Formation {
  id: string
  titre: string
  description: string
  categorie: string
  duree: string
  niveau: string
  participants: number
  etapes: string[]
}

interface Categorie {
  id: string
  nom: string
  description: string
  couleur: string
  icone: string
}

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

const FormationsList: React.FC = () => {
  const [formations, setFormations] = useState<Formation[]>([])
  const [categories, setCategories] = useState<Categorie[]>([])
  const [categorieSelectionnee, setCategorieSelectionnee] = useState<string>("toutes")
  const [recherche, setRecherche] = useState<string>("")

  useEffect(() => {
    setFormations(formationsData.formations)
    setCategories(formationsData.categories)
  }, [])

  const formationsFiltrees = formations.filter((formation) => {
    const matchCategorie = categorieSelectionnee === "toutes" || formation.categorie === categorieSelectionnee
    const matchRecherche =
      formation.titre.toLowerCase().includes(recherche.toLowerCase()) ||
      formation.description.toLowerCase().includes(recherche.toLowerCase())
    return matchCategorie && matchRecherche
  })

  const getCouleurCategorie = (categorieId: string) => {
    const categorie = categories.find((c) => c.id === categorieId)
    const couleurs = {
      orange: "from-orange-400 to-orange-600",
      purple: "from-purple-400 to-purple-600",
      yellow: "from-yellow-400 to-yellow-600",
      rose: "from-pink-400 to-pink-600",
      grenat: "from-red-800 to-red-900",
    }
    return couleurs[categorie?.couleur as keyof typeof couleurs] || "from-gray-400 to-gray-600"
  }

  const getNiveauCouleur = (niveau: string) => {
    switch (niveau) {
      case "Débutant":
        return "bg-green-100 text-green-800"
      case "Intermédiaire":
        return "bg-yellow-100 text-yellow-800"
      case "Avancé":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <AnimatedDiv className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Formations Technologiques</h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Découvrez notre catalogue de formations de pointe pour maîtriser les technologies de demain
            </p>
          </AnimatedDiv>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Barre de recherche */}
        <AnimatedDiv delay={100} className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher une formation..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
            />
          </div>
        </AnimatedDiv>

        {/* Filtres par catégorie */}
        <AnimatedDiv delay={200} className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setCategorieSelectionnee("toutes")}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                categorieSelectionnee === "toutes"
                  ? "bg-black text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Toutes les formations
            </button>
            {categories.map((categorie) => (
              <button
                key={categorie.id}
                onClick={() => setCategorieSelectionnee(categorie.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  categorieSelectionnee === categorie.id
                    ? "bg-black text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {categorie.nom}
              </button>
            ))}
          </div>
        </AnimatedDiv>

        {/* Grille des formations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {formationsFiltrees.map((formation, index) => (
            <AnimatedDiv key={formation.id} delay={index * 100}>
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className={`h-48 bg-gradient-to-br ${getCouleurCategorie(formation.categorie)} relative`}>
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getNiveauCouleur(formation.niveau)}`}
                    >
                      {formation.niveau}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-black mb-2 group-hover:text-orange-600 transition-colors">
                    {formation.titre}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{formation.description}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {formation.duree}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {formation.participants} participants
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">4.8</span>
                    </div>
                    <Link to="./robotique">
                        <button className="flex items-center text-orange-600 hover:text-orange-700 font-medium transition-colors">
                        Découvrir
                        <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                    </Link>
                  </div>
                </div>
              </div>
            </AnimatedDiv>
          ))}
        </div>

        {formationsFiltrees.length === 0 && (
          <AnimatedDiv className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-600 mb-2">Aucune formation trouvée</h3>
            <p className="text-gray-500">Essayez de modifier vos critères de recherche</p>
          </AnimatedDiv>
        )}
      </div>
    </div>
  )
}

export default FormationsList

const Bourse = () => {
  const scholarships = [
    {
      id: 1,
      title: "Bourse d'Excellence en Intelligence Artificielle",
      institute: "Institut Technologique de Paris",
      duration: "Échéance: 15 Mars 2026",
      level: "Niveau: Master - Doctorat",
      amount: "2.000.000 Ar",
      description: "Une bourse prestigieuse pour les étudiants passionnés par l'IA et le machine learning, couvrant les frais de scolarité et une allocation mensuelle.",
      criteria: [
        "Moyenne générale supérieure à 16/20",
        "Projet de recherche en IA",
        "Lettre de motivation",
        "Recommandations académiques"
      ]
    },
    {
      id: 2,
      title: "Bourse d'Excellence en Intelligence Artificielle",
      institute: "Institut Technologique de Paris",
      duration: "Échéance: 15 Mars 2026",
      level: "Niveau: Master - Doctorat",
      amount: "2.000.000 Ar",
      description: "Une bourse prestigieuse pour les étudiants passionnés par l'IA et le machine learning, couvrant les frais de scolarité et une allocation mensuelle.",
      criteria: [
        "Moyenne générale supérieure à 16/20",
        "Projet de recherche en IA",
        "Lettre de motivation",
        "Recommandations académiques"
      ]
    },
    {
      id: 3,
      title: "Bourse d'Excellence en Intelligence Artificielle",
      institute: "Institut Technologique de Paris",
      duration: "Échéance: 15 Mars 2026",
      level: "Niveau: Master - Doctorat",
      amount: "2.000.000 Ar",
      description: "Une bourse prestigieuse pour les étudiants passionnés par l'IA et le machine learning, couvrant les frais de scolarité et une allocation mensuelle.",
      criteria: [
        "Moyenne générale supérieure à 16/20",
        "Projet de recherche en IA",
        "Lettre de motivation",
        "Recommandations académiques"
      ]
    },
    {
      id: 4,
      title: "Bourse d'Excellence en Intelligence Artificielle",
      institute: "Institut Technologique de Paris",
      duration: "Échéance: 15 Mars 2026",
      level: "Niveau: Master - Doctorat",
      amount: "2.000.000 Ar",
      description: "Une bourse prestigieuse pour les étudiants passionnés par l'IA et le machine learning, couvrant les frais de scolarité et une allocation mensuelle.",
      criteria: [
        "Moyenne générale supérieure à 16/20",
        "Projet de recherche en IA",
        "Lettre de motivation",
        "Recommandations académiques"
      ]
    },
    {
      id: 5,
      title: "Bourse d'Excellence en Intelligence Artificielle",
      institute: "Institut Technologique de Paris",
      duration: "Échéance: 15 Mars 2026",
      level: "Niveau: Master - Doctorat",
      amount: "2.000.000 Ar",
      description: "Une bourse prestigieuse pour les étudiants passionnés par l'IA et le machine learning, couvrant les frais de scolarité et une allocation mensuelle.",
      criteria: [
        "Moyenne générale supérieure à 16/20",
        "Projet de recherche en IA",
        "Lettre de motivation",
        "Recommandations académiques"
      ]
    },
    {
      id: 6,
      title: "Bourse d'Excellence en Intelligence Artificielle",
      institute: "Institut Technologique de Paris",
      duration: "Échéance: 15 Mars 2026",
      level: "Niveau: Master - Doctorat",
      amount: "2.000.000 Ar",
      description: "Une bourse prestigieuse pour les étudiants passionnés par l'IA et le machine learning, couvrant les frais de scolarité et une allocation mensuelle.",
      criteria: [
        "Moyenne générale supérieure à 16/20",
        "Projet de recherche en IA",
        "Lettre de motivation",
        "Recommandations académiques"
      ]
    }
  ];

    function handleShowMenu(): void {
        throw new Error('Function not implemented.');
    }

    function setMobileMenuOpen(arg0: boolean): void {
        throw new Error('Function not implemented.');
    }

  return (
    <div style={{ fontFamily: "Space Grotesk, sans-serif" }} className="min-h-screen  relative overflow-hidden landing-layout">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-20 w-20 h-20 bg-purple-300 rounded-full opacity-50"></div>
      <div className="absolute top-32 right-32 w-16 h-16 bg-orange-400 rounded-full opacity-50"></div>
      <div className="absolute bottom-40 right-20 w-24 h-24 bg-yellow-400 rounded-full opacity-50"></div>
      <div className="absolute bottom-60 left-40 w-12 h-12 bg-pink-400 rounded-full opacity-50"></div>



      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block bg-pink-400 text-white px-6 py-3 rounded-full mb-8">
            <span className="flex items-center font-medium">
              Financez votre avenir tech 🚀
            </span>
          </div>
          
          <div className="mb-12">
            <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Opportunité de <span className="bg-orange-400 text-white px-6 py-2 rounded-2xl inline-block">bourses d'études</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Découvrez les meilleures opportunités de financement pour vos études en technologie. 
              Des bourses complètes aux programmes de recherche, trouvez le soutien qui vous correspond.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-900 mb-2">50+</div>
              <div className="text-gray-600 font-medium">Bourses disponibles</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-red-600 mb-2">2,5M Ariary</div>
              <div className="text-gray-600 font-medium">Montant total</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-900 mb-2">90 %</div>
              <div className="text-gray-600 font-medium">Taux de réussite</div>
            </div>
          </div>
        </div>

        {/* Scholarships Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-red-800 mb-12">
            Bourses disponibles
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {scholarships.map((scholarship) => (
              <div key={scholarship.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Bourse complète
                  </span>
                  <span className="text-xl font-bold text-gray-900">{scholarship.amount}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">{scholarship.title}</h3>
                <p className="text-gray-600 mb-2 font-medium">{scholarship.institute}</p>
                <div className="flex flex-col gap-1 text-sm text-gray-500 mb-4">
                  <span>{scholarship.duration}</span>
                  <span>{scholarship.level}</span>
                </div>
                
                <p className="text-sm text-gray-700 mb-6 leading-relaxed">{scholarship.description}</p>
                
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-gray-900 mb-3">Critères d'éligibilité:</h4>
                  <ul className="space-y-2">
                    {scholarship.criteria.map((criterion, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-600">
                        <span className="text-green-500 mr-2 mt-0.5 font-bold">✓</span>
                        <span>{criterion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button className="w-full bg-gradient-to-r from-pink-400 to-orange-400 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity">
                  Postuler maintenant
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-3xl p-12 shadow-lg border border-gray-100 text-center">
          <h3 className="text-3xl font-bold text-red-800 mb-6">
            Vous ne trouvez pas la bourse qui vous correspond?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Contactez notre équipe d'orientation pour découvrir d'autres opportunités personnalisées.
          </p>
          <button className="bg-red-800 text-white px-10 py-4 rounded-xl font-semibold hover:bg-red-900 transition-colors text-lg">
            Demander un conseil personnalisé
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bourse;
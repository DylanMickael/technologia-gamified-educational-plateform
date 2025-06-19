const bcrypt = require("bcrypt")
const { v4: uuidv4 } = require("uuid")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("admin123", 10)

    await queryInterface.bulkInsert(
      "users",
      [
        {
          id: uuidv4(),
          email: "admin@ecocity.com",
          password_hash: hashedPassword,
          nom: "Admin",
          prenom: "EcoCity",
          role: "admin",
          adresse: "123 Rue de l'Environnement",
          telephone: "+33123456789",
          photo_profil: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          email: "user@ecocity.com",
          password_hash: await bcrypt.hash("user123", 10),
          nom: "Utilisateur",
          prenom: "Test",
          role: "user",
          adresse: "456 Avenue Verte",
          telephone: "+33987654321",
          photo_profil: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {})
  },
}

const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    await queryInterface.bulkInsert(
      "users",
      [
        {
          id: uuidv4(),
          email: "admin@ecocity.com",
          password_hash: hashedPassword,
          nom: "Nirina",
          compagnion_type: "rose",
          compagnion_nom: "Mini ROBOT Rose",
          created_at: new Date(),
          updated_at: new Date(),
          category_id: 1,
        },
        {
          id: uuidv4(),
          email: "user@ecocity.com",
          password_hash: await bcrypt.hash("user123", 10),
          nom: "Sisi",
          compagnion_type: "bleu",
          compagnion_nom: "Mini ROBOT Bleu",
          created_at: new Date(),
          updated_at: new Date(),
          category_id: 1,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};

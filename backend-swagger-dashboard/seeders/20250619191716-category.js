const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          id: 1,
          nom: "pre-enfant",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          nom: "enfant",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          nom: "ado",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", null, {});
  },
};

const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', { logging: false });

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  urlTitle: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
},
// Getter methods start
{
  getterMethods: {
    route() {
      return `/wiki/${this.urlTitle}`;
    }
  },
// Hooks
  hooks: {
    beforeValidate: (page) => {
      console.log('hooks ran');
      if (page.title) {
        // Removes all non-alphanumeric characters from title
        // And make whitespace underscore
        page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
      } else {
        // Generates random 5 letter string
        page.urlTitle = Math.random().toString(36).substring(2, 7);
      }
    }
  }
}
);


const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
});

Page.belongsTo(User, { as: 'author' });

module.exports = {
  db: db,
  Page: Page,
  User: User
};

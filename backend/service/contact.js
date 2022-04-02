const ContactModel = require('../models/contact');

class ContactSevice {
  async getAllContacts() {
    const contacts = await ContactModel.find();
    return contacts;
  }

  async updCurrentContact(name, phone, contactId) {
    const contacts = await ContactModel.findById(contactId);
    if (contacts) {
      contacts.phone = phone;
      contacts.name = name;
      return contacts.save();
    }
    return contacts;
  }

  async setCurrentContact(name, phone, userId) {
    const contacts = await ContactModel.create({ name, phone, user: userId });
    return contacts;
  }

  async delCurrentContact(contactId) {
    const contacts = await ContactModel.findOne({ _id: contactId });
    await ContactModel.deleteOne({ _id: contactId });
    return contacts;
  }
}

module.exports = new ContactSevice();
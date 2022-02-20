const { v4 } = require('uuid')
const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.join(__dirname,"db","contacts.json")

async function listContacts() {
    const data = await fs.readFile(contactsPath)
    const contacts = JSON.parse(data)
    return contacts
}

async function getContactById(contactId) {
    const contacts = await listContacts()
    const result = contacts.find(contact => contact.id === contactId)
    if (!result) {
        return null
    }
    return result
}

async function removeContact(contactId) {
    const contacts = await listContacts()
    const deletingContactIndex = contacts.findIndex(item => item.id === contactId)
    if (deletingContactIndex === -1) {
        return null
    }
    const newContacts = contacts.filter((_, index) => index !== deletingContactIndex)
    await writeContacts(newContacts)
    return contacts[deletingContactIndex]
}

async function addContact({ name, email, phone }) {
    const contacts = await listContacts()
    const newContact = {
        id: v4(),
        name,
        email,
        phone
    }
    contacts.push(newContact)
    await writeContacts(contacts)
    return newContact
}
const writeContacts = async (contacts) => {
    await fs.writeFile(contactsPath, JSON.stringify(contacts))
}
module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}

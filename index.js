
const { action } = require("commander");
const contactsOperations = require("./contacts")

const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts()

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
        const data = await contactsOperations.listContacts()
        console.log("contacts in index.js",data)
      break;

    case 'get':
          const contact = await contactsOperations.getContactById(id)
          if (!contact) {
              console.log(`id ${id} not found`)
          } else {
              console.log("id in index",contact)
          }
      break;

    case 'add':
        const newContact = await contactsOperations.addContact({name,phone,email})
        console.log(newContact)
      break;

    case 'remove':
          const removeContact = await contactsOperations.removeContact(id)
          if (!removeContact) {
              console.log(`id ${id} not found`)
          } else {
              console.log(removeContact)
          }
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}
invokeAction(argv)

// const newContact = {
    //     name: "Mykola",
    //     email: "mykola@gmail.com",
    //     phone: "(911) 123-1212",
    // }
// invokeAction({action: "get", id:"31" });
// invokeAction({action:"add", name:newContact.name,phone:newContact.phone, email:newContact.email})
// invokeAction({action:"remove", id:"1"})
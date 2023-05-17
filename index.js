const {program} = require('commander');
const {
  listContacts,
  getContactById,
  removeContact, 
  addContact} = require('./contacts.js');

const invokeAction = async ({action, id, name, email, phone}) => {
  switch(action) {
    case 'list':
      const allContacts = await listContacts();
      return console.table(allContacts);

      case 'get':
        const contact = await getContactById(id);
        return console.log(contact);

        case 'add':
          const newContact = await addContact(name, email, phone);
          return console.log(newContact);

          case 'remove':
            const deleteContact = await removeContact(id);
            return console.log(deleteContact);

            default:
                return console.warn('\x1B[31m Unknown action type!')
  }
} 

program
  .option('-a, --action, <type>')
  .option('-i, --id, <type>')
  .option('-n, --name, <type>')
  .option('-e, --email, <type>')
  .option('-p, --phone, <type>');

program.parse();

const options = program.opts();
invokeAction(options);

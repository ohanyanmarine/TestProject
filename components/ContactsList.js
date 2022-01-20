import React, {useEffect, useState} from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  TouchableOpacity,
} from 'react-native';
import Contacts from 'react-native-contacts';
import {Contact} from '.';

const ContactsList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts',
    }).then(() => {
      Contacts.getAll()
        .then(contacts => {
          setContacts(contacts);
        })
        .catch(e => {
          console.log(e);
        });
    });
  }, []);

  const keyExtractor = (item, idx) => {
    return item?.recordID?.toString() || idx.toString();
  };
  const renderItem = ({item}) => {
    console.log('item_____________', item);
    console.log(item.givenName, ' ', item?.phoneNumbers[0]?.number);
    return <Contact contact={item} />;
  };
  const addCon = () => {
    var newPerson = {
      emailAddresses: [
        {
          label: 'work',
          email: 'mrniet@example.com',
        },
      ],
      familyName: 'Nietzsche',
      givenName: 'Friedrich',
    };
    //Contacts.addContact(newPerson)
    Contacts.openContactForm(newPerson).then(contact => {
      console.log('contact has been saved');
    });
  };

  return (
    <>
      <View style={styles.contactCon}>
       <TouchableOpacity onPress={addCon}>
          <Text>+ Create new contact</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        style={styles.list}
      />
    </>
  );
};
const styles = StyleSheet.create({
  list: {
    width: '100%',
  },
  contactCon: {
    width: '100%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#d9d9d9',
  },
  name: {
    fontSize: 16,
  },
  phoneNumber: {
    color: '#888',
  },
});
export default ContactsList;

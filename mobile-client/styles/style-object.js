import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 20,
  },
  content: {
    marginTop: 10,
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatlist: {
    width: 300,
    height: 350,
  },
  imgContainer: {
    justifyContent: 'center',
    width: '100%',
  },
  paragraph: {
    color: 'black',
  },
  input: {
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 1,
    marginBottom: 1,
    borderStyle: 'solid',
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  image: {
    resizeMode: 'contain',
    height: 300,
    width: '100%',
    borderRadius: 4,
  },
  button: {
    margin: 10,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 150,
    backgroundColor: '#03989E',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const stylesFab = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
    marginTop: 90,
  },
  fab: {
    width: 250,
    height: 'auto',
    margin: 16,
  },
});

// <<<<<<< HEAD
export const stylesForm = StyleSheet.create({
  label: {
    marginLeft: 15,
    marginTop: 15,
    marginBottom: 15,
    fontWeight: '700',
  },
  button: {
    margin: 20,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 150,
    backgroundColor: '#68BCF1',
    fontSize: 25,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 17,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 0.5,
    // marginBottom: 1,
    borderStyle: 'solid',
    width: '100%',
    // height: 100,
    // margin: 12,
    // borderWidth: 1,
  },
  textInputContainer: {},
});

export const stylesHeader = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 15,
    width: '100%',
  },

  logo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 20,
  },
  text: {
    fontWeight: '700',
    fontSize: 20,
  },
});
// =======
export const stylesModal = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 10,
    backgroundColor: '#FEFEFE',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '70%',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
    fontSize: 17,
  },
});

// export const stylesForm = StyleSheet.create({
//   label: {
//     marginTop: 15,
//     marginLeft: 15,
//     fontWeight: '700',
//   }
// });

// >>>>>>> main

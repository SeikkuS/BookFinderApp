import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  navigationContainer: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  tabBarOptions: {
    activeTintColor: '#D8DEE9',
    inactiveTintColor: '#777777',
    style: {
      borderTopWidth: 0,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: -2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 1.5,
    },
    labelStyle: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 5,
    }, 
    container: {
      flex: 1,
      backgroundColor: '#3B4252',
    },
    tabBarIcon: {
      marginBottom: -3,
    },
  },
});


   


export default styles;
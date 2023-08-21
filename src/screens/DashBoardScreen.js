import {RestaurantService} from '../services';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, TouchableOpacity, Image, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Colors, Fonts, Images} from '../constants';
import {StaticImageService} from '../services';
import {Display} from '../utils';

const sortStyle = isActive =>
  isActive
    ? styles.sortListItem
    : {...styles.sortListItem, borderBottomColor: Colors.DEFAULT_WHITE};

const DashBoardScreen = () => {
  const navigation = useNavigation();
  const signIn = () => {};

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.subcontainer}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('RestaurantAdd')}>
        <Image
          source={{uri: StaticImageService.getLogo('baskinrobbins')}}
          style={styles.posterStyle}
        />
        <Text style={styles.titleText}>"Add Restaurant"</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.subcontainer}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('AddedRestaurantsList')}>
        <Image
          source={{uri: StaticImageService.getLogo('baskinrobbins')}}
          style={styles.posterStyle}
        />
        <Text style={styles.titleText}>"Added Restaurants"</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DashBoardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.DEFAULT_WHITE,
    flexDirection: 'row',
    margin: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subcontainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.DEFAULT_WHITE,
    flexDirection: 'column',
    margin: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  posterStyle: {
    width: Display.setWidth(30),
    height: Display.setWidth(30),
    borderRadius: 25,
    margin: 5,
  },
  titleText: {
    fontSize: 15,
    lineHeight: 15 * 1.4,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    color: Colors.DEFAULT_BLACK,
  },
  tagText: {
    marginLeft: 8,
    fontSize: 11,
    lineHeight: 11 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
    color: Colors.DEFAULT_GREY,
    marginBottom: 5,
  },
  rowAndCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

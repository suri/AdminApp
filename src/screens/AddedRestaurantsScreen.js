import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RestrauntEditDeleteCard, Separator} from '../components';
import {Colors, Fonts, Mock} from '../constants';
import Feather from 'react-native-vector-icons/Feather';
import {RestaurantService} from '../services';
import {useNavigation} from '@react-navigation/native';
import {Display} from '../utils';

const sortStyle = isActive =>
  isActive
    ? styles.sortListItem
    : {...styles.sortListItem, borderBottomColor: Colors.DEFAULT_WHITE};

const AddedRestaurantsScreen = () => {
  const navigation = useNavigation();
  const [activeCategory, setActiveCategory] = useState();
  const [restaurants, setRestaurants] = useState(null);
  const [activeSortItem, setActiveSortItem] = useState('recent');
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      RestaurantService.getRestaurants().then(response => {
        if (response.status) {
          setRestaurants(response.data);
        }
      });
    });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.DEFAULT_WHITE}
        translucent
      />
      <Separator height={StatusBar.currentHeight} />
      <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back-outline"
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Restaurants List</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchSection}>
          <Ionicons
            name="search-outline"
            size={25}
            color={Colors.DEFAULT_GREY}
          />
          <Text style={styles.searchText}>Search..</Text>
        </View>

        <Feather
          name="sliders"
          size={20}
          color={Colors.DEFAULT_YELLOW}
          style={{marginRight: 10}}
        />
      </View>
      <ScrollView style={styles.listContainer}>
        <View style={styles.sortListContainer}>
          <TouchableOpacity
            style={sortStyle(activeSortItem === 'recent')}
            activeOpacity={0.8}
            onPress={() => setActiveSortItem('recent')}>
            <Text style={styles.sortListItemText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={sortStyle(activeSortItem === 'favourite')}
            activeOpacity={0.8}
            onPress={() => setActiveSortItem('favourite')}>
            <Text style={styles.sortListItemText}>Recent</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={sortStyle(activeSortItem === 'rating')}
            activeOpacity={0.8}
            onPress={() => setActiveSortItem('rating')}>
            <Text style={styles.sortListItemText}>Rating</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={sortStyle(activeSortItem === 'popular')}
            activeOpacity={0.8}
            onPress={() => setActiveSortItem('popular')}>
            <Text style={styles.sortListItemText}>Popular</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={sortStyle(activeSortItem === 'trending')}
            activeOpacity={0.8}
            onPress={() => setActiveSortItem('trending')}>
            <Text style={styles.sortListItemText}>Trending</Text>
          </TouchableOpacity>
        </View>
        {restaurants?.map(item => (
          <RestrauntEditDeleteCard
            {...item}
            navigate={restaurantId =>
              navigation.navigate('Restaurant', {restaurantId})
            }
            remove={restaurantId =>
              navigation.navigate('ResaurantEdit', {restaurantId})
            }
          />
        ))}
        <Separator height={Display.setHeight(5)} />
      </ScrollView>
    </View>
  );
};

export default AddedRestaurantsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.SECONDARY_WHITE,
  },
  backgroundCurvedContainer: {
    backgroundColor: Colors.DEFAULT_GREEN,
    height: 2000,
    position: 'absolute',
    top: -1 * (2000 - 230),
    width: 2000,
    borderRadius: 2000,
    alignSelf: 'center',
    zIndex: -1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 20,
  },
  locationText: {
    color: Colors.DEFAULT_WHITE,
    marginLeft: 5,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
  selectedLocationText: {
    color: Colors.DEFAULT_YELLOW,
    marginLeft: 5,
    fontSize: 14,
    lineHeight: 14 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
  alertBadge: {
    borderRadius: 32,
    backgroundColor: Colors.DEFAULT_YELLOW,
    justifyContent: 'center',
    alignItems: 'center',
    height: 16,
    width: 16,
    position: 'absolute',
    right: -2,
    top: -10,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 20 * 1.4,
    width: Display.setWidth(80),
    textAlign: 'center',
  },
  alertBadgeText: {
    color: Colors.DEFAULT_WHITE,
    fontSize: 10,
    lineHeight: 10 * 1.4,
    fontFamily: Fonts.POPPINS_BOLD,
  },
  searchContainer: {
    backgroundColor: Colors.DEFAULT_WHITE,
    height: 45,
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  searchText: {
    color: Colors.DEFAULT_GREY,
    fontSize: 16,
    lineHeight: 16 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
    marginLeft: 10,
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  listContainer: {
    paddingVertical: 5,
    zIndex: -5,
  },
  horizontalListContainer: {
    marginTop: 30,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 5,
  },
  listHeaderTitle: {
    color: Colors.DEFAULT_BLACK,
    fontSize: 16,
    lineHeight: 16 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
  listHeaderSubtitle: {
    color: Colors.DEFAULT_YELLOW,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
  sortListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: Colors.DEFAULT_WHITE,
    marginTop: 8,
    elevation: 1,
  },
  sortListItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.DEFAULT_YELLOW,
    height: 40,
  },
  sortListItemText: {
    color: Colors.DEFAULT_BLACK,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
  },
});

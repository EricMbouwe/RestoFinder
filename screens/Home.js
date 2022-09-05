import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  SafeAreaView,
  View,
  Text,
  RefreshControl,
} from 'react-native';
import { COLORS, SIZES } from '../constants';
import { HomeHeader, FocusedStatusBar, RestaurantCard } from '../components';

const Home = () => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [notFound, setNotFound] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const url =
    'https://dcom-native-interview.s3.amazonaws.com/api/merchant/query';

  const onRefresh = useCallback(async () => {
    const defaultSearchAddresses = [
      '55 Water St, 10041',
      '240 Kent Ave, 11249',
      '232 Willow Ave, 07030',
      '245 E 63rd St, 10065',
    ];

    const address =
      defaultSearchAddresses[
        Math.floor(Math.random() * defaultSearchAddresses.length)
      ];

    setRefreshing(true);
    await getRestaurants(address);
    setRefreshing(false);
  }, []);

  const getRestaurants = async (address) => {
    const formatedAddress = address
      .split(/[^A-Za-z0-9]+/)
      .join('_')
      .toLowerCase();

    try {
      const response = await fetch(`${url}/${formatedAddress}`);
      const json = await response.json();
      setData(json.merchants);
      setNotFound(false);
    } catch (error) {
      setLoading(false);
      setData([]);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (value) => {
    Keyboard.dismiss();
    setLoading(true);

    if (value.length === 0) {
      setData(data);
      setLoading(false);
      return;
    }

    await getRestaurants(value);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar background={COLORS.primary} />
      {isLoading && (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      )}

      {!isLoading && notFound && (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              fontSize: SIZES.extraLarge,
              paddingHorizontal: SIZES.font,
            }}
          >
            It appears we don't have exactly what you're looking for. You can
            always update or pull to refresh
          </Text>
        </View>
      )}

      <View style={{ flex: 1 }}>
        <View style={{ zIndex: 0 }}>
          <FlatList
            data={data}
            renderItem={({ item }) => <RestaurantCard data={item} />}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<HomeHeader onSearch={handleSearch} />}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </View>

        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: -1,
          }}
        >
          <View style={{ height: 300, backgroundColor: COLORS.primary }} />
          <View style={{ flex: 1, backgroundColor: COLORS.white }} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

import React, { useState } from 'react';
import { View, Text, Image, TextInput } from 'react-native';

import { COLORS, FONTS, SIZES, assets } from '../constants';
import { RectButton } from './Button';

const HomeHeader = ({ onSearch }) => {
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    onSearch(search);
    // setSearch('');
  };

  return (
    <View
      style={{
        backgroundColor: COLORS.primary,
        padding: SIZES.font,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontSize: SIZES.extraLarge,
            fontWeight: '900',
            color: COLORS.white,
          }}
        >
          RestoFinder
        </Text>

        <View style={{ width: 45, height: 45 }}>
          <Image
            source={assets.person01}
            resizeMode="contain"
            style={{ width: '100%', height: '100%' }}
          />
          <Image
            source={assets.badge}
            resizeMode="contain"
            style={{
              position: 'absolute',
              width: 15,
              height: 15,
              bottom: 0,
              right: 0,
            }}
          />
        </View>
      </View>

      <View style={{ marginVertical: SIZES.font }}>
        <Text
          style={{
            fontFamily: FONTS.regular,
            fontSize: SIZES.small,
            color: COLORS.white,
          }}
        >
          Hello Visitor 👋
        </Text>

        <Text
          style={{
            fontFamily: FONTS.bold,
            fontSize: SIZES.large,
            color: COLORS.white,
            marginTop: SIZES.base / 2,
          }}
        >
          Let’s find restaurants
        </Text>
      </View>

      <View style={{ flexDirection: 'row', marginTop: SIZES.font }}>
        <View
          style={{
            flex: 1,
            marginRight: SIZES.base,
            borderRadius: SIZES.font,
            backgroundColor: COLORS.gray,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: SIZES.font,
            paddingVertical: SIZES.small - 2,
          }}
        >
          <Image
            source={assets.search}
            resizeMode="contain"
            style={{ width: 20, height: 20, marginRight: SIZES.base }}
          />
          <TextInput
            placeholder="Street Address, City, State"
            style={{ flex: 1 }}
            value={search}
            onChangeText={(text) => setSearch(text)}
          />
        </View>

        <RectButton
          minWidth={120}
          fontSize={SIZES.font}
          handlePress={handleSearch}
          name={'Search'}
          backgroundColor={COLORS.secondary}
        />
      </View>
    </View>
  );
};

export default HomeHeader;

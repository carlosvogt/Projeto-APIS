import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@theme';
import { Home, Bee, Gps, Location } from '@assets';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Title5 } from '@components/typography';
import { View } from 'react-native';
import HomeScreen from './Home';
import ApiariesHome from './Apiaries/ApiariesHome';
import ApiariesMapScreen from './ApiariesMap';
import MortalityMapScreen from './MortalityMap';

function PrivateNavigator() {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const Tab = createBottomTabNavigator();
  const darkMode = useSelector((state) => state.mode.darkMode);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarInactiveTintColor: darkMode ? colors.secondary : colors.primary,
        tabBarActiveTintColor: darkMode ? colors.primary : colors.secondary,
        tabBarActiveBackgroundColor: darkMode
          ? colors.secondary
          : colors.primary,
        tabBarInactiveBackgroundColor: colors.background,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 65,
          backgroundColor: colors.background,
        },

        tabBarIcon: ({ color }) => {
          switch (route.name) {
            case 'HomeScreen':
              return (
                <>
                  <Home color={color} />
                  <Title5 color={color}>{t('translations:home')}</Title5>
                </>
              );
            case 'ApiariesHome':
              return (
                <>
                  <Bee color={color} />
                  <View style={{ marginTop: -6 }}>
                    <Title5 color={color}>{t('translations:apiaries')}</Title5>
                  </View>
                </>
              );
            case 'ApiariesMapScreen':
              return (
                <>
                  <Location color={color} />
                  <Title5 color={color}>{t('translations:apiariesMap')}</Title5>
                </>
              );
            case 'MortalityMapScreen':
              return (
                <>
                  <Gps color={color} />
                  <Title5 color={color}>
                    {t('translations:mortalityMap')}
                  </Title5>
                </>
              );
            default:
              break;
          }
          return null;
        },
      })}
      initialRouteName="Home"
      sceneContainerStyle={{
        backgroundColor: colors.background,
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarItemStyle: {
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
          },
        }}
      />
      <Tab.Screen
        name="ApiariesHome"
        options={{
          headerShown: false,
          tabBarItemStyle: {
            borderRadius: 10,
          },
        }}
        component={ApiariesHome}
      />
      <Tab.Screen
        name="ApiariesMapScreen"
        options={{
          headerShown: false,
          tabBarItemStyle: {
            borderRadius: 10,
          },
        }}
        component={ApiariesMapScreen}
      />
      <Tab.Screen
        name="MortalityMapScreen"
        options={{
          headerShown: false,
          tabBarItemStyle: {
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
          },
        }}
        component={MortalityMapScreen}
      />
    </Tab.Navigator>
  );
}

export default PrivateNavigator;

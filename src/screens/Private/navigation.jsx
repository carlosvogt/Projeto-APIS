import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@theme';
import { Home, Bee, Map, Gps, Location } from '@assets';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Title5 } from '@components/typography';
import { View } from 'react-native';
import HomeScreen from './Home';
import ApiariesHome from './Apiaries/ApiariesHome';
import ApiariesMapScreen from './ApiariesMap';
import MortalityMapScreen from './MortalityMap';
import RoutesMapScreen from './RoutesMap';

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
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          backgroundColor: colors.background,
        },

        tabBarIcon: ({ color }) => {
          switch (route.name) {
            case 'HomeScreen':
              return (
                <>
                  <Home color={color} />
                  <Title5 color={color}>{t('home:name')}</Title5>
                </>
              );
            case 'ApiariesHome':
              return (
                <>
                  <Bee color={color} />
                  <View style={{ marginTop: -6 }}>
                    <Title5 color={color}>{t('apiaries:name')}</Title5>
                  </View>
                </>
              );
            case 'ApiariesMapScreen':
              return (
                <>
                  <Location color={color} />
                  <Title5 color={color}>{t('apiariesMap:name')}</Title5>
                </>
              );
            case 'MortalityMapScreen':
              return (
                <>
                  <Map color={color} />
                  <Title5 color={color}>{t('mortalityMap:name')}</Title5>
                </>
              );
            case 'RoutesMapScreen':
              return (
                <>
                  <Gps color={color} />
                  <Title5 color={color}>{t('routesMap:name')}</Title5>
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
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
          },
        }}
      />
      <Tab.Screen
        name="ApiariesHome"
        options={{
          headerShown: false,
          tabBarItemStyle: {
            borderRadius: 20,
          },
        }}
        component={ApiariesHome}
      />
      <Tab.Screen
        name="ApiariesMapScreen"
        options={{
          headerShown: false,
          tabBarItemStyle: {
            borderRadius: 20,
          },
        }}
        component={ApiariesMapScreen}
      />
      <Tab.Screen
        name="MortalityMapScreen"
        options={{
          headerShown: false,
          tabBarItemStyle: {
            borderRadius: 20,
          },
        }}
        component={MortalityMapScreen}
      />
      <Tab.Screen
        name="RoutesMapScreen"
        options={{
          headerShown: false,
          tabBarItemStyle: {
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
          },
        }}
        component={RoutesMapScreen}
      />
    </Tab.Navigator>
  );
}

export default PrivateNavigator;

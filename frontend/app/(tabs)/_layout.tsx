import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#007AFF',
        tabBarStyle: Platform.select({
          ios: { position: 'absolute' },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Input',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="create-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="none"
        options={{
          title: 'none',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="alternatives"
        options={{
          title: 'alternatives',
          tabBarIcon: ({ color }) => (
            <Ionicons name="cart" size={28} color = {color}/>
          ),
        }}
      />
      <Tabs.Screen
          name="details"
          options={{
            title: 'Details',
            tabBarIcon: ({ color }) => (
              <Ionicons name="search-outline" size={28} color = {color}/>
            ),
          }}
      />

    </Tabs>
  );
}
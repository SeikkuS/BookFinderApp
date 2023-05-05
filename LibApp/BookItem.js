import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BookItem({ book, onAddToLibrary }) {
  return (
    <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10 }}>
      <Image
        source={{ uri: book.imageLinks?.thumbnail || 'https://via.placeholder.com/150x200.png?text=No+Image' }}
        style={{ width: 80, height: 120 }}
      />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={{ fontSize: 18 }}>{book.title}</Text>
        <Text style={{ fontSize: 14 }}>{book.authors?.join(', ')}</Text>
        <Text style={{ fontSize: 12 }}>{book.publisher}</Text>
        <TouchableOpacity onPress={onAddToLibrary}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
            <Ionicons name="add-circle-outline" size={20} color="black" />
            <Text style={{ marginLeft: 5 }}>Add To Library</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
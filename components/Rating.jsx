/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {StarIcon} from 'react-native-heroicons/solid'; // You can use any icon library you prefer

const Rating = () => {
  const [rating, setRating] = useState(4); // Initial rating is 0

  // Function to handle a star press and update the rating
  const handleStarPress = selectedRating => {
    setRating(selectedRating);
  };

  return (
    <View style={styles.container}>
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map(star => (
          <TouchableOpacity
            key={star}
            onPress={() => handleStarPress(star)}
            style={styles.star}>
            <StarIcon
              name={star <= rating ? 'star' : 'star-o'} // 'star' for filled star, 'star-o' for outline star
              size={20}
              color={star <= rating ? '#FFD700' : '#CCC'} // Color of the star
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
  },
  label: {
    fontSize: 14,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  star: {
    marginHorizontal: 0,
  },
  ratingText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 0,
  },
});

export default Rating;

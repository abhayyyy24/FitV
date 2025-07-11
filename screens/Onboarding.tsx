import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ViewToken,
  Image,
} from 'react-native';
import Colors from '@/constants/Colors';

const { width } = Dimensions.get('window');

// Update this to match your actual image paths
const slides = [
  {
    id: '1',
    image: require('@/assets/images/health.jpg'),
    title: 'Track Your Health',
    subtitle: 'Monitor your vitals like heart rate, steps, and more.',
  },
  {
    id: '2',
    image: require('@/assets/images/coach.jpg'),
    title: 'Smart AI Coach',
    subtitle: 'Get personalized insights based on your data.',
  },
  {
    id: '3',
    image: require('@/assets/images/privacy.jpg'),
    title: 'Privacy First',
    subtitle: 'Your data is secure and stays with you.',
  },
];

interface OnboardingProps {
  onDone: () => void;
}

export default function Onboarding({ onDone }: OnboardingProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      onDone();
    }
  };

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index ?? 0);
      }
    }
  ).current;

  const renderItem = ({ item }: any) => (
    <View style={styles.slide}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>
      <Image source={item.image} style={styles.image} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={onViewableItemsChanged}
      />

      <View style={styles.dotsContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index && styles.activeDot,
            ]}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>
          {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 60,
    alignItems: 'center',
    
  },
  slide: {
    width: width,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
    borderRadius:20,
  },
  title: {
    fontSize: 25,
    fontFamily: 'Bold',
    textAlign: 'center',
    color: Colors.textPrimary,
    marginTop:50,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Regular',
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
    marginBottom:30,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: Colors.primary,
    width: 12,
    height: 12,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 30,
    marginBottom: 80,
    width:'40%',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Bold',
    fontSize: 16,
    textAlign:"center",
    alignItems:'center'
  },
});

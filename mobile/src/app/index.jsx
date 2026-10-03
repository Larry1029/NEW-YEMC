import { useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const features = [
  {
    icon: 'briefcase-outline',
    title: 'Executive leadership',
    description: 'Learn from leaders shaping business, faith, and culture.',
  },
  {
    icon: 'trending-up-outline',
    title: 'Practical growth',
    description: 'Build the skills and clarity to move your work forward.',
  },
  {
    icon: 'people-outline',
    title: 'Purposeful community',
    description: 'Connect, collaborate, and grow with the next generation.',
  },
];

export default function Index() {
  const { width } = useWindowDimensions();
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollRef = useRef(null);
  const contentWidth = Math.min(width - 32, 720);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={[styles.content, { width: contentWidth }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Pressable accessibilityLabel="YEMC home" accessibilityRole="button" style={styles.brandButton}>
            <View style={styles.logoMark}>
              <Text style={styles.logoText}>Y</Text>
            </View>
            <Text style={styles.brandName}>YEMC</Text>
          </Pressable>
          <Pressable
            accessibilityLabel={menuOpen ? 'Close menu' : 'Open menu'}
            accessibilityRole="button"
            hitSlop={8}
            onPress={() => setMenuOpen((open) => !open)}
            style={styles.iconButton}
          >
            <Ionicons name={menuOpen ? 'close-outline' : 'menu-outline'} size={25} color="#FFFFFF" />
          </Pressable>
        </View>

        {menuOpen && (
          <View style={styles.menu}>
            {['About us', 'Programs', 'Community'].map((item) => (
              <Pressable key={item} accessibilityRole="button" style={styles.menuItem}>
                <Text style={styles.menuText}>{item}</Text>
                <Ionicons name="chevron-forward" size={18} color="#B9A5D5" />
              </Pressable>
            ))}
          </View>
        )}

        <LinearGradient colors={['#3E1768', '#21103F']} style={styles.hero}>
          <Text style={styles.eyebrow}>YOUNG EXECUTIVE MASTER CLASS</Text>
          <Text
            accessibilityRole="header"
            style={[styles.title, width <= 380 ? styles.titleCompact : styles.titleRegular]}
          >
            Grow into the leader you are becoming.
          </Text>
          <Text style={styles.bodyText}>
            A practical community for the next generation of Christian business leaders.
          </Text>
          <Pressable accessibilityRole="button" style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Join the master class</Text>
            <Ionicons name="arrow-forward" size={19} color="#160B29" />
          </Pressable>
        </LinearGradient>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>What you will build</Text>
          <Text style={styles.sectionBody}>Clear skills, strong character, and a community that moves with you.</Text>
        </View>

        <View style={styles.featureList}>
          {features.map((feature) => (
            <View key={feature.title} style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Ionicons name={feature.icon} size={22} color="#D98AF7" />
              </View>
              <View style={styles.featureCopy}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.bottomCallout}>
          <Text style={styles.calloutTitle}>Ready to take the next step?</Text>
          <Text style={styles.calloutBody}>Meet people building purposeful businesses and meaningful careers.</Text>
          <Pressable accessibilityRole="button" style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Explore YEMC</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#10091F',
  },
  content: {
    alignSelf: 'center',
    paddingBottom: 32,
  },
  header: {
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandButton: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoMark: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D43EAA',
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },
  brandName: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '800',
    letterSpacing: 1,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#261441',
  },
  menu: {
    marginBottom: 16,
    padding: 8,
    borderRadius: 16,
    backgroundColor: '#211136',
    borderWidth: 1,
    borderColor: '#4B3266',
  },
  menuItem: {
    minHeight: 44,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  hero: {
    padding: 24,
    borderRadius: 24,
    overflow: 'hidden',
  },
  eyebrow: {
    marginBottom: 16,
    color: '#D98AF7',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  title: {
    maxWidth: 620,
    color: '#FFFFFF',
    fontWeight: '800',
  },
  titleCompact: {
    fontSize: 30,
    lineHeight: 36,
  },
  titleRegular: {
    fontSize: 34,
    lineHeight: 40,
  },
  bodyText: {
    maxWidth: 580,
    marginTop: 16,
    color: '#E4D9EF',
    fontSize: 16,
    lineHeight: 25,
  },
  primaryButton: {
    minHeight: 48,
    marginTop: 24,
    paddingHorizontal: 18,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#FFFFFF',
  },
  primaryButtonText: {
    color: '#160B29',
    fontSize: 16,
    fontWeight: '800',
  },
  sectionHeader: {
    marginTop: 32,
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 30,
  },
  sectionBody: {
    maxWidth: 600,
    marginTop: 8,
    color: '#C8BBD3',
    fontSize: 16,
    lineHeight: 25,
  },
  featureList: {
    gap: 12,
  },
  featureCard: {
    minHeight: 96,
    padding: 16,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: '#1C102D',
    borderWidth: 1,
    borderColor: '#38234D',
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#35204B',
  },
  featureCopy: {
    flex: 1,
  },
  featureTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 22,
  },
  featureDescription: {
    marginTop: 4,
    color: '#C8BBD3',
    fontSize: 16,
    lineHeight: 24,
  },
  bottomCallout: {
    marginTop: 32,
    padding: 20,
    borderRadius: 18,
    backgroundColor: '#261441',
  },
  calloutTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 26,
  },
  calloutBody: {
    marginTop: 8,
    color: '#D6C8E0',
    fontSize: 16,
    lineHeight: 25,
  },
  secondaryButton: {
    minHeight: 48,
    marginTop: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#B36BD2',
  },
  secondaryButtonText: {
    color: '#F1C8FF',
    fontSize: 16,
    fontWeight: '700',
  },
});
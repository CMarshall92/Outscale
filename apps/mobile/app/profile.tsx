import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import {
  Check,
  User,
  Mail,
  UserCircle,
  Hash,
  Calendar,
  Clock,
  XCircle,
  ArrowLeft,
} from "lucide-react-native";
import SignOutButton from "../components/SignOutButton";

export default function ProfileScreen() {
  const { user } = useUser();
  const router = useRouter();

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "Not available";
    return new Date(dateString).toLocaleDateString();
  };

  const isVerified =
    user?.emailAddresses?.[0]?.verification?.status === "verified";

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <LinearGradient
            colors={["#2563eb", "#3b82f6", "#22d3ee"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientHeader}
          >
            <TouchableOpacity
              onPress={() => router.replace("/(tabs)")}
              style={styles.backButtonContainer}
            >
              <View style={styles.blurWrapper}>
                <ArrowLeft color="white" size={26} />
              </View>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <View style={styles.mainContent}>
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: user?.imageUrl }}
                style={styles.avatarImage}
              />
            </View>

            <Text style={styles.userName}>{user?.fullName || "User"}</Text>
            <Text style={styles.userEmail}>
              {user?.primaryEmailAddress?.emailAddress}
            </Text>

            <View
              style={[
                styles.verifiedBadge,
                !isVerified && styles.unverifiedBadge,
              ]}
            >
              {isVerified ? (
                <>
                  <Check size={12} color="#15803d" />
                  <Text style={styles.verifiedText}>Email Verified</Text>
                </>
              ) : (
                <>
                  <XCircle size={12} color="#b91c1c" />
                  <Text style={[styles.verifiedText, { color: "#b91c1c" }]}>
                    Unverified
                  </Text>
                </>
              )}
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Personal Information</Text>
            <View style={styles.gap4}>
              <InfoRow
                icon={User}
                iconColor="#2563eb"
                bg="#eff6ff"
                label="First Name"
                value={user?.firstName}
              />
              <InfoRow
                icon={User}
                iconColor="#9333ea"
                bg="#faf5ff"
                label="Last Name"
                value={user?.lastName}
              />
              <InfoRow
                icon={Mail}
                iconColor="#16a34a"
                bg="#f0fdf4"
                label="Email"
                value={user?.primaryEmailAddress?.emailAddress}
              />
              <InfoRow
                icon={UserCircle}
                iconColor="#ea580c"
                bg="#fff7ed"
                label="Username"
                value={user?.username || "Not set"}
                valueStyle={!user?.username && styles.italicText}
              />
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Account Details</Text>
            <View style={styles.gap4}>
              <InfoRow
                icon={Hash}
                iconColor="#4f46e5"
                bg="#eef2ff"
                label="User ID"
                value={user?.id}
                valueStyle={styles.monoText}
              />
              <InfoRow
                icon={Calendar}
                iconColor="#0891b2"
                bg="#ecfeff"
                label="Member Since"
                value={formatDate(user?.createdAt?.toString())}
              />
              <InfoRow
                icon={Clock}
                iconColor="#db2777"
                bg="#fdf2f8"
                label="Last Sign In"
                value={
                  user?.lastSignInAt
                    ? new Date(user.lastSignInAt).toLocaleString()
                    : "N/A"
                }
              />
            </View>
          </View>

          <View style={[styles.card, styles.lastCard]}>
            <Text style={styles.cardTitle}>Actions</Text>
            <View style={styles.gap3}>
              <SignOutButton />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const InfoRow = ({
  icon: Icon,
  iconColor,
  bg,
  label,
  value,
  valueStyle,
}: any) => (
  <View style={styles.row}>
    <View style={[styles.iconBox, { backgroundColor: bg }]}>
      <Icon size={20} color={iconColor} />
    </View>
    <View style={styles.rowContent}>
      <Text style={styles.label}>{label}</Text>
      <Text numberOfLines={1} style={[styles.value, valueStyle]}>
        {value || "Not provided"}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  backButtonContainer: {
    position: "absolute",
    top: 20,
    left: 20,
    borderRadius: 999,
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  blurWrapper: {
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  container: { flex: 1, backgroundColor: "#f9fafb" },
  scrollContent: { paddingBottom: 40 },
  headerContainer: { height: 160 },
  gradientHeader: { flex: 1, justifyContent: "center", alignItems: "center" },
  headerTitleContainer: { marginTop: Platform.OS === "android" ? 40 : 0 },
  headerTitle: { color: "white", fontSize: 20, fontWeight: "600" },
  mainContent: { paddingHorizontal: 16, flex: 1 },
  profileSection: { alignItems: "center", marginTop: -64, marginBottom: 24 },
  avatarContainer: {
    borderRadius: 999,
    padding: 4,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  avatarImage: { width: 112, height: 112, borderRadius: 56 },
  userName: {
    fontSize: 24,
    fontWeight: "600",
    color: "#111827",
    marginTop: 12,
  },
  userEmail: { fontSize: 14, color: "#6b7280", marginTop: 4 },
  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#dcfce7",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#bbf7d0",
  },
  unverifiedBadge: { backgroundColor: "#fee2e2", borderColor: "#fecaca" },
  verifiedText: {
    color: "#15803d",
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 4,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    elevation: 2,
  },
  lastCard: { marginBottom: 0 },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 16,
  },
  gap4: { gap: 16 },
  gap3: { gap: 12 },
  row: { flexDirection: "row", alignItems: "center", gap: 12 },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  rowContent: { flex: 1 },
  label: { fontSize: 12, color: "#6b7280", marginBottom: 2 },
  value: { fontSize: 14, color: "#111827" },
  italicText: { fontStyle: "italic", color: "#9ca3af" },
  monoText: {
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
    fontSize: 11,
  },
  btnPrimary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#2563eb",
  },
  btnIcon: { marginRight: 8 },
  btnTextPrimary: { color: "white", fontWeight: "500", fontSize: 14 },
});

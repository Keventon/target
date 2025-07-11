import { colors, fontFamily } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 10,
  },
  label: {
    color: colors.gray[600],
    fontSize: 12,
    fontFamily: fontFamily.medium,
  },
  input: {
    width: "100%",
    height: 48,
    fontSize: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    color: colors.black,
    borderBottomColor: colors.gray[400],
    fontFamily: fontFamily.regular,
  },
});

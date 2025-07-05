import { HomeHeader } from "@/components/HomeHeader";
import { View } from "react-native";

const summary = {
  total: "R$ 1.000,00",
  input: {
    label: "Entradas",
    value: "R$ 1.000,00",
  },
  output: {
    label: "Saídas",
    value: "-R$ 800,00",
  },
};

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <HomeHeader data={summary} />
    </View>
  );
}

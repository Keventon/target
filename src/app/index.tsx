import { Button } from "@/components/Button";
import { HomeHeader } from "@/components/HomeHeader";
import { List } from "@/components/List";
import { Target } from "@/components/Target";
import { router } from "expo-router";
import { StatusBar, View } from "react-native";

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

const targets = [
  {
    id: "1",
    name: "Comprar uma cadeira ergonômica",
    percentage: "75%",
    current: "900",
    target: "1.200",
  },
  {
    id: "2",
    name: "Apple Watch Series 7",
    percentage: "50%",
    current: "1.000",
    target: "2.000",
  },
  {
    id: "3",
    name: "Comprar um mouse da Logitech",
    percentage: "25%",
    current: "100",
    target: "500",
  },
];

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <HomeHeader data={summary} />

      <List
        title="Metas"
        data={targets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Target
            data={item}
            onPress={() => router.navigate(`/in-progress/${item.id}`)}
          />
        )}
        emptyMessage="Nenhuma meta cadastrada. Toque em nova meta para criar."
        containerStyle={{ paddingHorizontal: 24 }}
      />

      <View style={{ padding: 24, paddingBottom: 32 }}>
        <Button title="Nova meta" onPress={() => router.navigate("/target")} />
      </View>
    </View>
  );
}

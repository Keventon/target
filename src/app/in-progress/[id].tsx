import { Button } from "@/components/Button";
import { List } from "@/components/List";
import { PageHeader } from "@/components/PageHeader";
import { Progress } from "@/components/Progress";
import { Transaction, TransactionProps } from "@/components/Transaction";
import { TransactionTypes } from "@/utils/TransactionTypes";
import { router, useLocalSearchParams } from "expo-router";
import { View } from "react-native";

const details = {
  current: "R$ 580",
  target: "R$ 1.790",
  percentage: 25,
};

const transactions: TransactionProps[] = [
  {
    id: "1",
    value: "R$ 20",
    date: "10/07/2025",
    type: TransactionTypes.Output,
    description: "",
  },
  {
    id: "2",
    value: "R$ 300,00",
    date: "10/07/2025",
    type: TransactionTypes.Input,
    description: "CDB de 110% no banco XPTO",
  },
];

export default function InProgress() {
  const params = useLocalSearchParams<{ id: string }>();

  return (
    <View style={{ flex: 1, padding: 24, gap: 32 }}>
      <PageHeader
        title="Apple Watch"
        rightButton={{ onPress: () => {}, icon: "edit" }}
      />

      <Progress data={details} />

      <List
        title="Transações"
        data={transactions}
        renderItem={({ item }) => (
          <Transaction data={item} onRemove={() => {}} />
        )}
        emptyMessage="Nenhuma transação. Toque em nova transação para guardar seu dinheiro aqui."
      />

      <Button
        title="Nova transação"
        onPress={() => router.navigate(`/transaction/${params.id}`)}
      />
    </View>
  );
}

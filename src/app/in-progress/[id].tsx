import { Button } from "@/components/Button";
import { List } from "@/components/List";
import { PageHeader } from "@/components/PageHeader";
import { Progress } from "@/components/Progress";
import { Transaction, TransactionProps } from "@/components/Transaction";
import { TransactionTypes } from "@/utils/TransactionTypes";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { Alert, View } from "react-native";

import { useTargetDatabase } from "@/database/useTargetDatabase";
import { useCallback, useState } from "react";
import { numberToCurrency } from "@/utils/numberToCurrency";
import { Loading } from "@/components/Loading";

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
  const [isFetching, setIsFetching] = useState(true);
  const [details, setDetails] = useState({
    name: "",
    current: "R$ 0,00",
    target: "R$ 0,00",
    percentage: 0,
  });

  const params = useLocalSearchParams<{ id: string }>();

  const targetDatabase = useTargetDatabase();

  async function fetchDetails() {
    try {
      const response = await targetDatabase.show(Number(params.id));
      setDetails({
        name: response.name,
        current: numberToCurrency(response.current),
        target: numberToCurrency(response.amount),
        percentage: response.percentage,
      });
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os detalhes da meta");
      console.log(error);
    }
  }

  async function fetchData() {
    const fetchDetailsPromise = fetchDetails();

    await Promise.all([fetchDetailsPromise]);
    setIsFetching(false);
  }

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  if (isFetching) {
    return <Loading />;
  }

  return (
    <View style={{ flex: 1, padding: 24, gap: 32 }}>
      <PageHeader
        title={details.name}
        rightButton={{
          onPress: () => router.navigate(`/target?id=${params.id}`),
          icon: "edit",
        }}
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

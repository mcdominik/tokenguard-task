import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { getGrowthIndex } from "./api/api";
import { Box, Flex, Select, Text } from "@chakra-ui/react";
import { Chain, Granularity, Metric, Period } from "./dto/growth-index.dto";
import { BasicTimeLineData } from "./types/basic-timeline-data";
import MultiButton from "./components/MultiButton";
import { chartOptions } from "./config/charts";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function App() {
  const [granularity, setGranularity] = useState<Granularity>(Granularity.WEEK);
  const [primaryChain, setPrimaryChain] = useState<Chain>(Chain.ETHEREUM);
  const [secondaryChain, setSecondaryChain] = useState<Chain>(Chain.POLYGON);
  const [period, setPeriod] = useState<Period>(Period.LAST_YEAR);
  const [growthIndex, setGrowthIndex] = useState<BasicTimeLineData>();

  const handlePrimaryChainChange = (event: any) => {
    setPrimaryChain(event.target.value);
  };

  const handleSencondaryChainChange = (event: any) => {
    setSecondaryChain(event.target.value);
  };

  useEffect(() => {
    const getData = async () => {
      const dto = {
        metric: Metric.TG_GROWTH_INDEX,
        period: period,
        chainName: primaryChain,
        compareWith: [secondaryChain],
        granularity: granularity,
      };
      const data = await getGrowthIndex(dto);
      setGrowthIndex(data);
    };
    getData();
  }, [granularity, period, primaryChain, secondaryChain]);

  const blockchainData = {
    labels: growthIndex?.blockchain.tg_growth_index.map((entry) => entry.date),
    datasets: [
      {
        data: growthIndex?.blockchain.tg_growth_index.map(
          (entry) => entry.value
        ),
        label: primaryChain,
        borderColor: "#84ec7e",
        backgroundColor: "#84ec7e",
        color: "#000",
      },
    ],
  };

  const cumulativeData = {
    labels: growthIndex?.cumulative.tg_growth_index.map((entry) => entry.date),
    datasets: [
      {
        data: growthIndex?.cumulative.tg_growth_index.map(
          (entry) => entry.value
        ),
        label: primaryChain,
        borderColor: "#af33c9",
        backgroundColor: "#af33c9",
        color: "#000",
      },
    ],
  };

  return (
    <Flex
      direction="column"
      minH="100vh"
      bg="#05050d"
      p={10}
      alignItems={"center"}
      color="white"
      gap={14}
    >
      <Text fontSize={"40px"} fontWeight={600}>
        tokenguard.io
      </Text>
      <Flex direction="column" gap={5} w="full" borderRadius={20} minH="90vh">
        <Flex
          alignItems={"center"}
          p={10}
          direction={["column", "column", "row"]}
          gap={10}
          bg={"#16172b"}
          borderRadius={20}
          flexWrap={"wrap"}
          justifyContent={"center"}
        >
          <Flex gap={10} fontWeight={600}>
            <Box>
              <Text mb={2}>Primary chain</Text>
              <Select
                placeholder="Select chain"
                onChange={handlePrimaryChainChange}
                defaultValue={Chain.ETHEREUM}
              >
                <option value={Chain.ETHEREUM}>Ethereum</option>
                <option value={Chain.SOLANA}>Solana</option>
                <option value={Chain.POLYGON}>Polygon</option>
              </Select>
            </Box>
            <Box>
              <Text mb={2}>Secondary chain</Text>
              <Select
                placeholder="Select chain"
                onChange={handleSencondaryChainChange}
                defaultValue={Chain.POLYGON}
              >
                <option value={Chain.ETHEREUM}>Ethereum</option>
                <option value={Chain.ETHEREUM}>Solana</option>
                <option value={Chain.POLYGON}>Polygon</option>
              </Select>
            </Box>
          </Flex>

          <MultiButton
            options={[
              { label: "Week", value: Granularity.WEEK },
              { label: "Two weeks", value: Granularity.TWO_WEEKS },
              { label: "Montly", value: Granularity.MONTH },
            ]}
            value={granularity}
            onChange={(e) => setGranularity(e as Granularity)}
            label={"Granularity"}
          />
          <MultiButton
            options={[
              { label: "Last Month", value: Period.LAST_MONTH },
              { label: "Last Year", value: Period.LAST_YEAR },
            ]}
            value={period}
            onChange={(e) => setPeriod(e as Period)}
            label={"Period"}
          />
        </Flex>

        <Flex direction={["column", "column", "row"]} fontWeight={600} gap={5}>
          <Box
            w="full"
            flex={1}
            textAlign={"center"}
            bg={"#16172b"}
            borderRadius={20}
            p={5}
          >
            Blockchain
            <Line
              options={chartOptions}
              data={blockchainData}
              style={{
                maxWidth: "100%",
                maxHeight: "500px",
                borderColor: "#84ec7e",
              }}
              color="#84ec7e"
            />
          </Box>
          <Box
            p={5}
            w="full"
            flex={1}
            textAlign={"center"}
            bg={"#16172b"}
            borderRadius={20}
          >
            Cumulative
            <Line
              options={chartOptions}
              data={cumulativeData}
              style={{ maxWidth: "100%", maxHeight: "500px" }}
            />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}

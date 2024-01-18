import React, { useEffect, useState } from "react";
import { Card, Form, Input, Select } from "antd";
import { RiCoinsLine } from "react-icons/ri";

function Money() {
  const apiUrl = `https://open.er-api.com/v6/latest/USD`;
  const firstDefaultValue = "USD";
  const SecondDefaultValue = "INR";
  const [moneyList, setMoneyList] = useState([]);
  const [IntputValue, setInputValue] = useState("");
  const [firstSelect, setFirstSelect] = useState(firstDefaultValue);
  const [secondSelect, setSecondSelect] = useState(SecondDefaultValue);
  const [result, setResult] = useState("0");
  const [exchangeRates, setExchangeRates] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await fetch(apiUrl);
    const jsonData = await response.json();

    const data = jsonData.rates;
    const currencies = Object.keys(data);

    setMoneyList(currencies);
    setExchangeRates(data);
  }

  useEffect(() => {
    if (firstSelect !== secondSelect && IntputValue !== "") {
      const exchangeRate =
        (1 / exchangeRates[firstSelect]) * exchangeRates[secondSelect];
      const convertedValue = parseFloat(IntputValue) * exchangeRate;
      setResult(convertedValue.toFixed(2));
    } else {
      setResult("0");
    }
  }, [IntputValue, firstSelect, secondSelect, moneyList]);
  return (
    <div>
      <Card
        style={{ width: "550px", marginInline: "auto", marginBlock: "180px" }}
        title={
          <div style={{ display: "flex", gap: "15px" }}>
            <h1>
              <RiCoinsLine />
            </h1>
            <h1> Money Exchanger</h1>
          </div>
        }
      >
        <Form size="large">
          <Form.Item>
            <div style={{ display: "flex", flexDirection: "row", gap: "50px" }}>
              <label style={{ textAlign: "center" }}>Amount</label>
              <Input onChange={(e) => setInputValue(e.target.value)} />
            </div>
          </Form.Item>
        </Form>

        <div className="select-box">
          <div style={{ display: "flex", flexDirection: "row", gap: "50px" }}>
            <label>From</label>
            <Select
              style={{ width: "120px" }}
              defaultValue={firstDefaultValue}
              onChange={(value) => setFirstSelect(value)}
            >
              {moneyList.map((currency) => (
                <Select.Option key={currency} value={currency}>
                  {currency}
                </Select.Option>
              ))}
            </Select>
          </div>

          <div style={{ display: "flex", flexDirection: "row", gap: "50px" }}>
            <label>To</label>
            <Select
              style={{ width: "120px" }}
              defaultValue={SecondDefaultValue}
              onChange={(value) => setSecondSelect(value)}
            >
              {moneyList.map((currency) => (
                <Select.Option key={currency} value={currency}>
                  {currency}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>

        <h2>Converson Rate : {result} </h2>
      </Card>
    </div>
  );
}

export default Money;

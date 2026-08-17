import {
  useEffect,
  useState,
} from "react";

import {
  getCustomer,
  getCustomerUsage,
} from "../services/customerApi";


function useCustomer(customerNumber) {

  const [customer, setCustomer] =
    useState(null);

  const [usage, setUsage] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);


  useEffect(() => {

    if (!customerNumber) {
      return;
    }

    async function loadCustomerData() {

      try {

        setLoading(true);
        setError(null);

        const customerData =
          await getCustomer(customerNumber);

        const usageData =
          await getCustomerUsage(
            customerNumber
          );

        setCustomer(customerData);
        setUsage(usageData);

      } catch (err) {

        console.error(
          "Customer API Error:",
          err
        );

        setError(err.message);

      } finally {

        setLoading(false);
      }
    }

    loadCustomerData();

  }, [customerNumber]);


  return {
    customer,
    usage,
    loading,
    error,
  };
}


export default useCustomer;
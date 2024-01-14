import React, { useEffect, useState } from "react";
import styles from "./css/styles.module.css";
import { API_URL, IMG_URL } from "../../../../config";
import { get_data } from "../../../../networkHandler";

function SKU({ phone, appContext }) {
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchSkuDetails();
  }, [phone, appContext.reload]);

  function fetchSkuDetails() {
    get_data(`${API_URL}/support/consumer/sales/pitch/v1/?phone=${phone}`).then(
      function (data) {
        if (data) {
          setData(data?.data);
          setLoader(false);
        }
      }
    );
  }
  return (
    <div className={styles.container}>
      {loader ? (
        <div className="loader_container">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          {data?.length != 0 ? (
            data?.map((item, idx) => {
              return (
                <div key={idx} className={styles.sku_item}>
                  <span className={styles.item_details_img}>
                    <img
                      src={`${IMG_URL}/${item.product_details.small_image_id}`}
                      className={styles.img}
                    />
                    <span className={styles.item_details}>
                      <span className={styles.key_value}>
                        {item.product_details.name}
                      </span>
                      <span className={styles.key_name}>
                        {item.product_details.pack_qt}
                      </span>
                    </span>
                  </span>
                  <span className={styles.item_details}>
                    <span className={styles.key_name}>Packs ordered</span>
                    <span className={styles.key_value}>{item.qt}</span>
                  </span>
                  <span className={styles.item_details}>
                    <span className={styles.key_name}>Product Frequency</span>
                    <span className={styles.key_value}>{item.frequency}</span>
                  </span>
                </div>
              );
            })
          ) : (
            <div className={styles.no_product}>
              <p>No SKU Found</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default SKU;

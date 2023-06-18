/** @format */

import React from "react";
import "./style.css";
import SingleProduct from "../single_product/SingleProduct";

function Style() {
  return (
    <div className="style_container grid wide">
      <div className="style_heading">Enjoy a new blend of coffee style</div>
      <div className="style_text">
        Explore all flavours of coffee with us. There is always a new cup worth
        experiencing
      </div>
      {/* render list new blend style:
              - check the coffee product
              - which one new  => render in this list  */}
      <ul className="style_list">
        <SingleProduct
          src="https://images.ctfassets.net/v601h1fyjgba/3BPpnehRjlQ9xzGPcYU2lU/6ad989f0eb91676186dceeb8de1be459/Cappuccino.jpg"
          name="Cappuccino"
          price="8.50"
          isProduct={true}
          isLoved={false}
        />
        <SingleProduct
          src="https://images.ctfassets.net/v601h1fyjgba/3BPpnehRjlQ9xzGPcYU2lU/6ad989f0eb91676186dceeb8de1be459/Cappuccino.jpg"
          name="Cappuccino"
          price="8.50"
          isProduct={true}
          isLoved={false}
        />
        <SingleProduct
          src="https://images.ctfassets.net/v601h1fyjgba/3BPpnehRjlQ9xzGPcYU2lU/6ad989f0eb91676186dceeb8de1be459/Cappuccino.jpg"
          name="Cappuccino"
          price="8.50"
          isProduct={true}
          isLoved={false}
        />
        <SingleProduct
          src="https://images.ctfassets.net/v601h1fyjgba/3BPpnehRjlQ9xzGPcYU2lU/6ad989f0eb91676186dceeb8de1be459/Cappuccino.jpg"
          name="Cappuccino"
          price="8.50"
          isProduct={true}
          isLoved={false}
        />
      </ul>
    </div>
  );
}

export default Style;

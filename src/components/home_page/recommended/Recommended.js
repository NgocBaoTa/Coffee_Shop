/** @format */

import React from "react";
import "./recommended.css";
import SingleProduct from "../single_product/SingleProduct";
import Button from "../../button/Button";

function Recommended() {
  return (
    <div className="recommended_container grid wide">
      <div className="recommended_heading">Recommended products</div>
      <div className="recommended_text">
        We don’t just make your coffee, we make your day!
      </div>

      {/* render list new blend style:
              - check the coffee product
              - which one new  => render in this list  */}
      <ul className="recommended_list">
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

        <SingleProduct
          src="https://images.ctfassets.net/v601h1fyjgba/3BPpnehRjlQ9xzGPcYU2lU/6ad989f0eb91676186dceeb8de1be459/Cappuccino.jpg"
          name="Cappuccino"
          price="8.50"
          isProduct={true}
          isLoved={false}
        />
      </ul>

      <div className="recommended_bottom">
        <div className="recommended_bottom--secondary">
          Great ideas start with great coffee, Lets help you achieve that
        </div>
        <div className="recommended_bottom--main"> Get started today.</div>
        <Button className="recommended_bottom--btn" name="Join Us" />
      </div>
    </div>
  );
}

export default Recommended;

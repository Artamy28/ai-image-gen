import React from "react";
import { Card } from "../components/exportComponents";

const RenderCardGallery = ({ data, title }) => {
	if (data?.length > 0) {
		return data.map((post) => <Card key={post._id} {...post} />);
	}

	return <h2 className="mt-5 font-bold text-[#16191f] text-xl">{title}</h2>;
};

export default RenderCardGallery;

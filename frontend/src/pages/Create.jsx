import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { preview } from "../assets/exportAssets";
import { getRandomPrompt } from "../utils/utilities";
import { FormField, Loading } from "../components/exportComponents";

const Create = () => {
	const navigate = useNavigate();
	const [form, setForm] = useState({
		name: "",
		prompt: "",
		photo: "",
	});
	const [generatingImage, setGeneratingImage] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (form.prompt && form.photo) {
			setLoading(true);

			try {
				const response = await fetch(
					"https://ai-image-gen-0xbq.onrender.com/api/post",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(form),
					}
				);

				const data = await response.json();
				navigate("/");
			} catch (error) {
				alert(error);
			} finally {
				setLoading(false);
			}
		} else {
			alert("Please enter a prompt and generate an image");
		}
	};

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSurpriseMe = () => {
		const randomPrompt = getRandomPrompt(form.prompt);
		setForm({ ...form, prompt: randomPrompt });
	};

	const generateImage = async () => {
		if (form.prompt) {
			try {
				setGeneratingImage(true);
				const response = await fetch(
					"https://ai-image-gen-0xbq.onrender.com/api/dalle",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ prompt: form.prompt }),
					}
				);

				const data = await response.json();
				setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
			} catch (error) {
				alert(error);
			} finally {
				setGeneratingImage(false);
			}
		} else {
			alert("Please enter a prompt");
		}
	};

	return (
		<section className="max-w-7xl mx-auto">
			<div>
				<h1 className="font-extrabold text-3xl text-[#16191f]">Create</h1>
				<p className="mt-2 text-base text-[#42505c]">
					Create stunning images generated using DALL-E
				</p>
			</div>

			<form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
				<div className="flex flex-col gap-5">
					<FormField
						labelName="Your name"
						type="text"
						name="name"
						placeholder="Jack Adams"
						value={form.name}
						handleChange={handleChange}
					/>
					<FormField
						labelName="Prompt"
						type="text"
						name="prompt"
						placeholder="A realistic photograph of a young woman with blue eyes and blonde hair"
						value={form.prompt}
						handleChange={handleChange}
						isSurpriseMe
						handleSurpriseMe={handleSurpriseMe}
					/>
					<div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
						{form.photo ? (
							<img
								src={form.photo}
								alt={form.prompt}
								className="w-full h-full object-contain"
							/>
						) : (
							<img
								src={preview}
								alt="placeholder preview"
								className="w-3/4 h-3/4 object-contain opacity-30"
							/>
						)}

						{generatingImage && (
							<div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
								<Loading />
							</div>
						)}
					</div>
				</div>

				<div className="mt-5 flex gap-5">
					<button
						type="button"
						onClick={generateImage}
						className="text-white bg-green-700 font-medium rounded-md text-sm px-5 py-2.5 text-center w-full sm:w-auto"
					>
						{generatingImage ? "Generating..." : "Generate"}
					</button>
				</div>

				<div className="mt-10">
					<p className="mt-2 text-[#42505c] text-sm">
						You can share your image with others in the community
					</p>
					<button
						type="submit"
						className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm px-5 py-2.5 text-center w-full sm:w-auto"
					>
						{loading ? "Sharing..." : "Share with the community"}
					</button>
				</div>
			</form>
		</section>
	);
};

export default Create;

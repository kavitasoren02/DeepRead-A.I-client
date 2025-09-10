import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { ReactTyped } from "react-typed";
import {
  type ContactProps,
  contactProps,
  type contactResponse,
} from "../../Service/interface";
import { _post } from "../../Service/ApiService";
import { CONTACT } from "../../Service/useApiService";
import { toast } from "react-toastify";

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState<ContactProps>(contactProps);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await _post<contactResponse>(CONTACT, form);
      toast.success(data.message);
      setForm(contactProps);
      formRef.current?.reset();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section id="contact"
     className="bg-white py-20 px-5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="lg:text-5xl text-3xl font-semibold text-gray-800">
            <ReactTyped
              strings={["Contact Us"]}
              typeSpeed={70}
              backSpeed={50}
              loop
            />
          </h1>
          <p className="text-gray-600 lg:text-2xl text-xl mt-4 font-medium">
            We'd love to hear from you! Fill out the form below to get in touch.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          ref={formRef}
          className="bg-white shadow-lg rounded-2xl p-8 space-y-6 border border-gray-200"
        >
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              className="w-full bg-gray-50 py-3 px-4 placeholder-gray-400 text-gray-800 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Your Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-gray-50 py-3 px-4 placeholder-gray-400 text-gray-800 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Your Message
            </label>
            <textarea
              rows={6}
              name="message"
              placeholder="Write your message here..."
              value={form.message}
              onChange={handleChange}
              className="w-full bg-gray-50 py-3 px-4 placeholder-gray-400 text-gray-800 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 transition"
            ></textarea>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className=" cursor-pointer bg-gradient-to-r from-green-600 to-green-800 text-white py-3 px-10 rounded-full font-semibold text-lg shadow-lg hover:scale-105 transition-transform duration-300"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>

        <div className="text-center mt-10">
          <p className="text-gray-600">
            You can also reach us via email at{" "}
            <span className="text-green-700 font-medium">
              support@deepreadai.com
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;

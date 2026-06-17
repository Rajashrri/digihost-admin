import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";

import { toast } from "react-toastify";

import {
  getSeoByIdApi,
  updateSeoApi,
} from "../../api/blogApi";

export default function EditSeo() {
  const { id } = useParams();

  const navigate = useNavigate();

const [formData, setFormData] = useState<{
  metaTitle: string;
  metaKeywords: string;
  metaDescription: string;
  mainImageAlt: string;
  featuredImageAlt: string;
  schemaCode: string;
}>({
  metaTitle: "",
  metaKeywords: "",
  metaDescription: "",
  mainImageAlt: "",
  featuredImageAlt: "",
  schemaCode: "",
});

  useEffect(() => {
    fetchSeo();
  }, []);

  const fetchSeo = async () => {
    try {
      const response = await getSeoByIdApi(id);

      if (response.data.success) {
        setFormData(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

 const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData({
    ...formData,
    [name]: value,
  });

  setErrors({
    ...errors,
    [name]: "",
  });
};
const [errors, setErrors] = useState({});
 const handleSubmit = async (e) => {
  e.preventDefault();

  const newErrors = {};

  if (!formData.metaTitle.trim()) {
    newErrors.metaTitle = "Meta Title is required";
  }

 

  setErrors(newErrors);

  if (Object.keys(newErrors).length > 0) {
    return;
  }

  try {
    const response = await updateSeoApi(id, formData);

    if (response.data.success) {
      toast.success(response.data.message);
      navigate(-1);
    }
  } catch (error) {
    toast.error("Something went wrong");
  }
};

  return (
    <>
      <PageBreadcrumb pageTitle="Blog SEO" />

      <div className="space-y-6">
        <ComponentCard title="Blog SEO">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="p-6">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6">

                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      Meta Title
                    </label>
<input
  type="text"
  name="metaTitle"
  value={formData.metaTitle}
  onChange={handleChange}
  className="h-11 w-full rounded-lg border px-4"
/>

{errors.metaTitle && (
  <p className="mt-1 text-sm text-red-500">
    {errors.metaTitle}
  </p>
)}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      Meta Keywords
                    </label>

                    <textarea
  rows={3}
  name="metaKeywords"
  value={formData.metaKeywords}
  onChange={handleChange}
  className="w-full rounded-lg border px-4 py-3"
/>


                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      Meta Description
                    </label>

                    <textarea
                      rows={4}
                      name="metaDescription"
                      value={formData.metaDescription}
                      onChange={handleChange}
                      placeholder="Meta Description"
                      className="w-full rounded-lg border px-4 py-3"
                    />
            </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      Alt Tag Main Image
                    </label>

                    <input
                      type="text"
                      name="mainImageAlt"
                      value={formData.mainImageAlt}
                      onChange={handleChange}
                      placeholder="Alt Tag Main Image"
                      className="h-11 w-full rounded-lg border px-4"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      Alt Tag Featured Image
                    </label>

                    <input
                      type="text"
                      name="featuredImageAlt"
                      value={formData.featuredImageAlt}
                      onChange={handleChange}
                      placeholder="Alt Tag Featured Image"
                      className="h-11 w-full rounded-lg border px-4"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      Schema Code
                    </label>

                    <textarea
                      rows={10}
                      name="schemaCode"
                      value={formData.schemaCode}
                      onChange={handleChange}
                      placeholder="Paste JSON-LD Schema"
                      className="w-full rounded-lg border px-4 py-3 font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    className="rounded-lg bg-brand-500 px-4 py-3 text-white"
                  >
                    Update SEO
                  </button>

                </div>
              </form>
            </div>
          </div>
        </ComponentCard>
      </div>
    </>
  );
}
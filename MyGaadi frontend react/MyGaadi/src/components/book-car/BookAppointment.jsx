import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const BookAppointment = () => {
    const {carId} = useParams()
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const token = sessionStorage.getItem("token")

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        await axios.post(
            `http://localhost:8080/appointment/${carId}`,
            { message },
            {
              headers: {
                Authorization: `Bearer ${token}`  
              }
            }
          ).then(()=>{
            toast.success("Appointment was booked")
           
          });
    } 
    catch (error) {
      console.error(error);
      
      if(error.response)
      {
      const { message } = error.response.data;
      toast.error(`${message}`)
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-8 rounded-3xl shadow-2xl bg-gradient-to-br from-white via-gray-50 to-blue-50 border border-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">📅 Book Appointment</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
            <table style={{marginLeft:"auto", marginRight:"auto"}}>
                <tbody>
                    <tr>
                        <td> 
                     <label className="block text-sm font-medium text-gray-600 mb-1">
                         Enter Message 
                     <span className="text-red-500">*</span> </label>
                        </td>
                        <td>
                        <textarea
                          name="message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          required
                          rows={2}
                          placeholder="Enter preferred time, questions, etc."
                          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                        </td>
                    </tr>
                </tbody>
            </table>
         
         
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 text-white font-semibold rounded-xl transition-all duration-200 ${
            loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Booking..." : "Confirm Appointment"}
        </button>
      </form>
    </div>
  );
};

export default BookAppointment;

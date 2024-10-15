export const AffiliateLinkDetails = ({
   isPopupOpen,
   closePopup,
   linkData,
}: any) => {
   const handleOverlayClick = (e: any) => {
      if (e.target === e.currentTarget) {
         closePopup();
      }
   };

   return (
      <div className="z-10" onClick={handleOverlayClick}>
         {/* Popup window */}
         {isPopupOpen && (
            <div
               className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
               onClick={handleOverlayClick}
            >
               <div className="bg-white border border-gray-300 p-5 rounded-lg shadow-lg max-w-5xl w-full">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
                     Redirect Details
                  </h2>

                  {/* Scrollable table container */}
                  <div className="overflow-x-auto max-h-96 overflow-y-auto">
                     <table className="min-w-full bg-white border-separate border-spacing-2 shadow-md rounded-lg">
                        <thead className="bg-gray-200">
                           <tr className="text-left border-b border-gray-300">
                              <th className="px-4 py-3 font-semibold text-gray-700">
                                 Device
                              </th>
                              <th className="px-4 py-3 font-semibold text-gray-700">
                                 OS
                              </th>
                              <th className="px-4 py-3 font-semibold text-gray-700">
                                 browser
                              </th>
                              <th className="px-4 py-3 font-semibold text-gray-700">
                                 Land On
                              </th>
                           </tr>
                        </thead>
                        <tbody className="text-sm text-gray-600">
                           {linkData.length > 0 ? (
                              linkData.map((redirect: any) => (
                                 <tr
                                    key={redirect.id}
                                    className="border-b border-gray-200 hover:bg-gray-50"
                                 >
                                    <td className="px-4 py-2">
                                       {redirect.device}
                                    </td>
                                    <td className="px-4 py-2">{redirect.os}</td>
                                    <td className="px-4 py-2">
                                       {redirect.browser}
                                    </td>
                                    <td className="px-4 py-2">
                                       {new Date(
                                          redirect.created_at
                                       ).toLocaleString()}
                                    </td>
                                 </tr>
                              ))
                           ) : (
                              <tr>
                                 <td
                                    colSpan={3}
                                    className="px-4 py-2 text-center"
                                 >
                                    No redirects
                                 </td>
                              </tr>
                           )}
                        </tbody>
                     </table>
                  </div>

                  <div className="flex justify-end mt-6">
                     <button
                        onClick={closePopup}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                     >
                        Close
                     </button>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

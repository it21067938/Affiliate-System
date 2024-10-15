import { LinkedinIcon } from "lucide-react";
import {
   EmailShare,
   FacebookShare,
   TwitterShare,
   WhatsappShare,
} from "react-share-kit";

export const PopupWindow = ({ isPopupOpen, closePopup, url }: any) => {
   const handleOverlayClick = (e: any) => {
      if (e.target === e.currentTarget) {
         closePopup();
      }
   };

   return (
      <div className="App z-10">
         {/* Popup window */}
         {isPopupOpen && (
            <div
               className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
               onClick={handleOverlayClick}
            >
               <div
                  className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4 sm:mx-6 lg:mx-8"
                  onClick={(e) => e.stopPropagation()}
               >
                  <h2 className="text-xl font-bold mb-4 text-center">Share</h2>
                  <div className="flex flex-wrap justify-evenly mb-4">
                     <FacebookShare
                        url={url}
                        quote={"Share this link. "}
                        borderRadius={10}
                     />
                     <WhatsappShare
                        url={url}
                        title={"Share this link. "}
                        separator=":: "
                        borderRadius={10}
                     />
                     <TwitterShare
                        url={url}
                        title={"Share this link. "}
                        borderRadius={10}
                     />
                     <EmailShare
                        url={url}
                        subject={"Share this link. "}
                        body={`Visit this link ${url}`}
                        borderRadius={10}
                     />
                  </div>
                  <div className="flex justify-end">
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

import { Josefin_Sans } from "next/font/google";

import "@/app/_styles/globals.css"
import Header from "./_components/Header";
import { ReservationProvider } from "./_components/ReservationContext";




export const metadata = {
  title: {
    template:"%s | The wild Osis",
    default:"welcome | The wild Osis"

  },
  description:"Lunurious cabin hotel,located in the heart of the Italian Dolomites surrounded by beautiful mountains and dark forests."
  
};
const josefin=Josefin_Sans({
  subsets:["latin"],
  display:"swap"

})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${josefin.className} bg-primary-950 text-primary-100 min-h-screen flex flex-col`}>
        <Header />
        <div className="flex-1 py-12 px-8  grid">
        <main className="mx-auto max-w-7xl w-full">
       <ReservationProvider>
       {children}
       </ReservationProvider>
        </main>
        </div>
       
        
        </body>
    </html>
  );
}

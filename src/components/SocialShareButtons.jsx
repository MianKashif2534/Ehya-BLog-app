import React from 'react';
import { FaSquareFacebook, FaSquareWhatsapp } from 'react-icons/fa6';
import { FaTwitterSquare, FaInstagramSquare } from 'react-icons/fa';

function SocialShareButtons({ url, title }) {
  return (
    <div className='w-full flex gap-x-2'>
      {/* Facebook Share */}
      <a
        href={`https://www.facebook.com/dialog/share?app_id=2909739942509255&display=popup&href=${url}`}
        target='_blank'
        rel='noreferrer'
      >
        <FaSquareFacebook className='text-[#3b5998] w-7 h-auto' />
      </a>

      {/* Twitter Share */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
          title
        )}&url=${encodeURIComponent(url)}`}
        target='_blank'
        rel='noreferrer'
      >
        <FaTwitterSquare className='text-[#1DA1F2] w-7 h-auto' />
      </a>

      {/* WhatsApp Share */}
      <a
        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`}
        target='_blank'
        rel='noreferrer'
      >
        <FaSquareWhatsapp className='text-[#25D366] w-7 h-auto' />
      </a>

      {/* Instagram (Placeholder) */}
      <a
        href={`https://www.instagram.com/`}
        target='_blank'
        rel='noreferrer'
      >
        <FaInstagramSquare className='text-[#E4405F] w-7 h-auto' />
      </a>
    </div>
  );
}

export default SocialShareButtons;

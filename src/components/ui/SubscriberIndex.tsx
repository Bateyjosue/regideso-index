import { Link } from 'react-router-dom';

export type Chat = {
  name: string;
  text: string;
  color: string;
  avenue: string
};

const chatData: Chat[] = [
  {
    name: 'Devid Heilo',
    text: '20345m3',
    color: '#10B981',
    avenue: 'Avenue 1',
  },
  {
    name: 'Henry Fisher',
    text: '20345m3',
    color: '#DC3545',
    avenue: 'Avenue 1',

  },
  {
    name: 'Jhon Doe',
    text: "20345m3",
    color: '#10B981',
    avenue: 'Avenue 1',

  },
  {
    name: 'Jane Doe',
    text: '20345m3',
    color: '#FFBA00',
    avenue: 'Avenue 1',

  },
  {
    name: 'Jhon Doe',
    text: '20345m3',
    color: '#10B981',
    avenue: 'Avenue 1',

  },
  {
    name: 'Jhon Doe',
    text: '20345m3',
    color: '#FFBA00',
    avenue: 'Avenue 1',

  },
];
const SubscriberIndex = () => {
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <h4 className="mb-6 px-7.5 text-xl font-semibold text-black dark:text-white">
        Top Index
      </h4>

      <div>
        {chatData.map((chat, key) => (
          <Link
            to="/"
            className="flex items-center gap-5 py-3 px-7.5 hover:bg-gray-3 dark:hover:bg-meta-4"
            key={key}
          >
            <div className="relative h-14 w-14 rounded-full">
              <span
                className="absolute right-0 bottom-0 h-3.5 w-3.5 rounded-full border-2 border-white"
                style={{backgroundColor: chat.color}}
              ></span>
            </div>

            <div className="flex flex-1 items-center justify-between">
              <div>
                <h5 className="font-medium text-black dark:text-white">
                  {chat.name}
                </h5>
              <p className='flex gap-x-4 items-center justify-center border'>
                  <span className="text-sm text-black dark:text-white">
                    {chat.text}
                  </span>
                  <span className="text-xs">{chat.avenue}</span>
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SubscriberIndex;

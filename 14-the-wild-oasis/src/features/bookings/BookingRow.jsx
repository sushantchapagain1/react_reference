import styled from 'styled-components';
import { format, isToday } from 'date-fns';
import { useNavigate } from 'react-router-dom';

import Tag from '../../ui/Tag';
import Table from '../../ui/Table';
import Modal from '../../ui/Modal';
import Menus from '../../ui/Menus';
import ConfirmDelete from '../../ui/ConfirmDelete';

import { formatCurrency } from '../../utils/helpers';
import { formatDistanceFromNow } from '../../utils/helpers';
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEllipsisHorizontal,
  HiEye,
  HiTrash,
} from 'react-icons/hi2';

import { useCheckOut } from '../../hooks/check-in-out/useCheckOut';
import { useDeleteBooking } from '../../hooks/bookings/useDeleteBooking';

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
`;

function BookingRow({ booking }) {
  const navigate = useNavigate();

  const { checkOut, isCheckingOut } = useCheckOut();
  const { deleteBooking, isDeleting } = useDeleteBooking();

  const {
    id: bookingId,

    startDate,
    endDate,
    numNights,

    status,
    totalPrice,
    cabins: { name: cabinName },
    guests: { fullName: guestName, email },
  } = booking || {};

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? 'Today'
            : formatDistanceFromNow(startDate)}{' '}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), 'MMM dd yyyy')} &mdash;{' '}
          {format(new Date(endDate), 'MMM dd yyyy')}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId}>
            <HiEllipsisHorizontal />
          </Menus.Toggle>
          <Menus.List id={bookingId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/bookings/${bookingId}`)}
            >
              See Details
            </Menus.Button>

            {status === 'unconfirmed' && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/check-in/${bookingId}`)}
              >
                Check in
              </Menus.Button>
            )}

            {status === 'checked-in' && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                onClick={() => checkOut(bookingId)}
                disabled={isCheckingOut}
              >
                Check out
              </Menus.Button>
            )}

            <Modal.Open opens="delete-booking">
              <Menus.Button icon={<HiTrash />} disabled={isDeleting}>
                Delete
              </Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>
        <Modal.Window name="delete-booking">
          <ConfirmDelete
            resourceName="booking"
            onConfirm={() => deleteBooking(bookingId)}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;

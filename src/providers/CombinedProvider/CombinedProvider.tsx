import {
  AuthProvider,
  DashboardProvider,
  RatesProvider,
  RoomsProvider,
} from "@providers";
import { DealsProvider } from "providers/DealsProvider";
import { GuestProvider } from "providers/GuestProvider";

export const CombinedProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <AuthProvider>
      <DashboardProvider>
        <RatesProvider>
          <DealsProvider>
            <GuestProvider>
              <RoomsProvider>{children}</RoomsProvider>
            </GuestProvider>
          </DealsProvider>
        </RatesProvider>
      </DashboardProvider>
    </AuthProvider>
  );
};

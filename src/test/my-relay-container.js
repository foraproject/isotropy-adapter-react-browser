import React from 'react';
import Relay from 'react-relay';
import MyRelayComponent from "./my-relay-component";

const relayContainer = Relay.createContainer(
    MyRelayComponent,
    {
        fragments: {
            ship: () => Relay.QL`
                fragment on Ship {
                    name
                }
            `,
        }
    }
);

export default relayContainer;

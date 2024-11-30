import React, { forwardRef } from 'react';

function AnnounceFullDescription(_props, ref){
    return (
        <div ref={ref} className='mt-14 mb-5'>
            <h2 className='text-xl font-bold'>
                Full description
            </h2>
            <p className='mt-3'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a ornare felis. Ut finibus id felis vel pellentesque. Quisque vitae tincidunt velit. Pellentesque turpis lectus, luctus eget ligula non, rhoncus porta elit. Proin pretium lectus id nisl suscipit imperdiet. Fusce tristique est tristique nisl dictum tempus. Donec vel quam pulvinar urna scelerisque pharetra.
                Morbi turpis velit, porta efficitur nibh eget, dapibus luctus nisi. Phasellus magna sapien, porttitor non accumsan nec, pellentesque eget neque. Etiam in tellus feugiat, dictum urna vel, finibus urna. Donec id venenatis felis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque mollis justo quis massa lobortis mattis. Nam sapien sem, maximus at iaculis at, luctus vitae justo. Praesent fermentum velit ut vehicula feugiat. Quisque placerat laoreet venenatis. Donec quis quam egestas, commodo dui nec, congue ex. Aenean sit amet ultricies tellus. In iaculis ante nec laoreet elementum.
            </p>
        </div>
    )
}

export default forwardRef(AnnounceFullDescription);
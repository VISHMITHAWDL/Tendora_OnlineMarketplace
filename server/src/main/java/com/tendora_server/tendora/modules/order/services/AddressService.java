package com.tendora_server.tendora.modules.order.services;

import java.security.Principal;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import com.tendora_server.tendora.modules.order.dto.AddressRequestDto;
import com.tendora_server.tendora.modules.order.entities.Address;
import com.tendora_server.tendora.modules.auth.entities.User;
import com.tendora_server.tendora.modules.order.repository.AddressRepository;

@Service
public class AddressService {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AddressRepository addressRepository;

    public Address createAddress(AddressRequestDto addressRequestDto, Principal principal){
        User user= (User) userDetailsService.loadUserByUsername(principal.getName());
        Address address = Address.builder()
                .name(addressRequestDto.getName())
                .street(addressRequestDto.getStreet())
                .city(addressRequestDto.getCity())
                .state(addressRequestDto.getState())
                .zipCode(addressRequestDto.getZipCode())
                .phoneNumber(addressRequestDto.getPhoneNumber())
                .user(user)
                .build();
        return addressRepository.save(address);
    }

    public void deleteAddress(UUID id) {
        addressRepository.deleteById(id);
    }
}
